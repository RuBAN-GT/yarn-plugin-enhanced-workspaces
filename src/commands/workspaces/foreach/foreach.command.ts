import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Option, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { isEnum } from 'typanion';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { WORKSPACE_PLUGIN_NAME } from './foreach.consts';
import { ChangeDetectionStrategy } from '../../../types/configuration';

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
  public excludeList = Option.Array('--exclude', [], {
    description: 'Exclude specific workspaces',
  });
  public includeList = Option.Array('--include', [], {
    description: 'Include specific workspaces',
  });

  // Dependencies
  public readonly cdManager: ChangeDetectionManager = new ChangeDetectionManager();

  public async execute(): Promise<void> {
    const config = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(config, this.context.cwd);

    this.validate(config);

    const affectedList: string[] = await this.getAffectedList(project);
    if (affectedList.length === 0) {
      console.dir('No affected workspaces.');
      return;
    }

    const commandList = ['workspaces', 'foreach', '-it', ...affectedList];
    if (Option.Boolean('-p,--parallel', false, { description: 'Run the commands in parallel' })) {
      commandList.push('--parallel');
    }
    await this.cli.run([...commandList, this.commandName, ...this.args]);
  }

  private async getAffectedList(project: Project): Promise<string[]> {
    // Logic
    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestors,
      ignoredAncestorsMarkers: this.ignoredAncestorsMarkers,
      withPrivate: this.withPrivate,
    });
    const affectedList: string[] = [];
    affectedNodes.forEach((node) => {
      if (
        this.excludeList.includes(node.name) ||
        (this.includeList.length > 0 && !this.includeList.includes(node.name))
      ) {
        return;
      }

      affectedList.push('--include');
      affectedList.push(node.name);
    });

    return affectedList;
  }

  private validate(config: Configuration): void {
    if (!config.plugins.has(WORKSPACE_PLUGIN_NAME)) {
      throw new UsageError(`You should install ${WORKSPACE_PLUGIN_NAME} plugin to use this command.`);
    }
  }
}
