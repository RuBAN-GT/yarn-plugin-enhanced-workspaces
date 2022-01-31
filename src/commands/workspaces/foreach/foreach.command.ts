import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Option, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { applyCascade, isAtLeast, isEnum, isNumber } from 'typanion';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { GroupManager, GroupsChunks } from '../../../core/group-manager';
import { WORKSPACE_PLUGIN_NAME } from './foreach.consts';
import { ChangeDetectionStrategy } from '../../../types/configuration';
import { getMapValues, getAvailableProcessesCount } from '../../../utils';

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
  public groupBy: number = Option.String('-g,--group-by', getAvailableProcessesCount().toString(), {
    description: 'Slice workspaces by this number, it should be positive number',
    validator: applyCascade(isNumber(), [isAtLeast(1)]),
  });
  public excludeList: string[] = Option.Array('--exclude', [], {
    description: 'Exclude specific workspaces',
  });
  public includeList: string[] = Option.Array('--include', [], {
    description: 'Include specific workspaces',
  });
  public extraList: string[] = Option.Array('--extra', [], {
    description: 'Add specific workspaces without change detection',
  });

  // Dependencies
  public readonly cdManager: ChangeDetectionManager = new ChangeDetectionManager();
  public readonly groupManager: GroupManager = new GroupManager();

  public async execute(): Promise<void> {
    const config = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(config, this.context.cwd);

    this.validate(config);

    const groups = await this.getGroups(project);
    if (groups.data.length === 0) {
      console.dir('No affected workspaces.');
      return;
    }

    await this.executeGroups(groups);
  }

  private async getGroups(project: Project): Promise<GroupsChunks<any>> {
    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestors,
      ignoredAncestorsMarkers: this.ignoredAncestorsMarkers,
      withPrivate: this.withPrivate,
      extra: this.extraList,
    });
    const requestedNodes = getMapValues(affectedNodes).filter((node) => {
      return !(
        this.excludeList.includes(node.name) ||
        (this.includeList.length > 0 && !this.includeList.includes(node.name))
      );
    });

    return this.groupManager.chunks({ groupBy: +this.groupBy, input: requestedNodes });
  }

  private async executeGroups(groups: GroupsChunks<any>): Promise<void> {
    const commandList = ['workspaces', 'foreach', '-i', '--topological-dev'];
    if (this.isParallel) {
      commandList.push('--parallel');
    }

    for await (const group of groups.data) {
      const groupNames = group.map((node) => node.name);
      const nodesList = groupNames.reduce((acc: string[], node) => [...acc, '--include', node], []);

      console.dir(`Execute '${this.args.join(' ')}' command over ${groupNames.join(', ')}`);
      await this.cli.run([...commandList, ...nodesList, this.commandName, ...this.args]);
    }
  }

  private validate(config: Configuration): void {
    if (!config.plugins.has(WORKSPACE_PLUGIN_NAME)) {
      throw new UsageError(`You should install ${WORKSPACE_PLUGIN_NAME} plugin to use this command.`);
    }
  }
}
