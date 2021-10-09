import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { WORKSPACE_PLUGIN_NAME } from './foreach.consts';
import { ChangeDetectionStrategy } from '../../../types/configuration';

export class ForeachCommand extends Command<CommandContext> {
  // Params
  @Command.String()
  public commandName!: string;

  @Command.Proxy()
  public args: string[] = [];

  @Command.Boolean('--private', { description: 'Include private workspaces' })
  public withPrivate: boolean = true;

  @Command.Array('--exclude', { description: 'Exclude specific workspaces' })
  public excludeList: string[] = [];

  @Command.Array('--include', { description: 'Include specific workspaces' })
  public includeList: string[] = [];

  @Command.Boolean('-p,--parallel', { description: 'Run the commands in parallel' })
  public isParallel: boolean = false;

  @Command.Boolean('-a,--ancestors', { description: 'Perform operation over ancestors' })
  public withAncestor: boolean = false;

  @Command.Array('--ignored-ancestors-markers', { description: 'The same as ignoredAncestorsMarkers' })
  public ignoredAncestorsMarkers: string[] = [];

  @Command.String('-s,--change-detection-strategy', { description: 'Change detection strategy' })
  public changeDetectionStrategy?: ChangeDetectionStrategy;

  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: `A wrapper over foreach with -it options helping to invoke operations for changed workspaces. Required to have installed ${WORKSPACE_PLUGIN_NAME} plugin.`,
  });

  // Dependencies
  public readonly cdManager: ChangeDetectionManager = new ChangeDetectionManager();

  // Commands
  @Command.Path('workspaces', 'changed', 'foreach')
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
    if (this.isParallel) {
      commandList.push('--parallel');
    }
    await this.cli.run([...commandList, this.commandName, ...this.args]);
  }

  private async getAffectedList(project: Project): Promise<string[]> {
    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestor,
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
