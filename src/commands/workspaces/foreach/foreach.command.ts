import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Option, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { applyCascade, isAtLeast, isEnum, isNumber } from 'typanion';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { WORKSPACE_PLUGIN_NAME } from './foreach.consts';
import { ChangeDetectionStrategy } from '../../../types/configuration';
import { getAvailableProcessesCount } from '../../../utils/system.utils';
import { GroupManager } from '../../../core/group-manager';
import { getMapValues } from '../../../utils/map.utils';
import { TreeNode } from '../../../core/workspace-tree';

export class ForeachCommand extends Command<CommandContext> {
  // Meta
  public static paths: string[][] = [['workspaces', 'changed', 'foreach']];
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: `A wrapper over foreach with -it options helping to invoke operations for changed workspaces. Required to have installed ${WORKSPACE_PLUGIN_NAME} plugin.`,
  });

  // Params
  public commandName: string = Option.String();
  public args: string[] = Option.Proxy() || [];

  public changeDetectionStrategy: ChangeDetectionStrategy = Option.String('-s,--change-detection-strategy', {
    description: 'Change detection strategy',
    validator: isEnum(ChangeDetectionStrategy),
  }) as any;
  public withAncestors: boolean = Option.Boolean('-a,--ancestors', false, {
    description: 'Perform operation over ancestors',
  });
  public ignoredAncestorsMarkers: string[] = Option.Array('--ignored-ancestors-markers', [], {
    description: 'The same as ignoredAncestorsMarkers',
  });
  public withPrivate: boolean = Option.Boolean('--private', true, {
    description: 'Include private workspaces',
  });
  public isParallel: boolean = Option.Boolean('-p,--parallel', false, { description: 'Run the commands in parallel' });
  public groupBy = Option.String('-g,--group-by', getAvailableProcessesCount().toString(), {
    description: 'Slice workspaces by this number, it should be positive number',
    validator: applyCascade(isNumber(), [isAtLeast(1)]),
  });
  public excludeList = Option.Array('--exclude', [], {
    description: 'Exclude specific workspaces',
  });
  public includeList = Option.Array('--include', [], {
    description: 'Include specific workspaces',
  });

  // Dependencies
  public readonly cdManager: ChangeDetectionManager = new ChangeDetectionManager();
  public readonly groupManager: GroupManager = new GroupManager();

  public async execute(): Promise<void> {
    const config = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(config, this.context.cwd);

    this.validate(config);

    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestors,
      ignoredAncestorsMarkers: this.ignoredAncestorsMarkers,
      withPrivate: this.withPrivate,
    });
    if (affectedNodes.size === 0) {
      console.dir('No affected workspaces.');
      return;
    }

    const chunks = this.groupManager.chunks({ groupBy: +this.groupBy, input: getMapValues(affectedNodes) });
    for await (const chunk of chunks.data) {
      console.log(`Execute operation over group: `, chunk.map((n) => n.name).join(', '));
      await this.executeCommandOverNodes(chunk);
    }
  }

  private async executeCommandOverNodes(nodes: TreeNode[]): Promise<void> {
    const defaultCommandList = ['workspaces', 'foreach', '-it'];
    if (this.isParallel) {
      defaultCommandList.push('--parallel');
    }

    const includeList = nodes.reduce((acc, node) => {
      if (
        this.excludeList.includes(node.name) ||
        (this.includeList.length > 0 && !this.includeList.includes(node.name))
      ) {
        return acc;
      }

      acc.push('--include');
      acc.push(node.name);

      return acc;
    }, [] as string[]);

    console.dir(`Execute the group: ${includeList}`);

    await this.cli.run([...defaultCommandList, ...includeList, this.commandName, ...this.args]);
  }

  private validate(config: Configuration): void {
    if (!config.plugins.has(WORKSPACE_PLUGIN_NAME)) {
      throw new UsageError(`You should install ${WORKSPACE_PLUGIN_NAME} plugin to use this command.`);
    }
  }
}
