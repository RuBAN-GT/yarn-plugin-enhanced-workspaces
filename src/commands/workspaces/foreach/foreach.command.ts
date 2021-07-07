import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { VersionManager } from '../../../core/version-manager';

export class ForeachCommand extends Command<CommandContext> {
  // Params
  @Command.String()
  public commandName!: string;

  @Command.Proxy()
  public args: Array<string> = [];

  @Command.Array('--exclude', { description: 'Exclude specific workspaces' })
  public excludeList: Array<string> = [];

  @Command.Array('--exclude', { description: 'Include specific workspaces' })
  public includeList: Array<string> = [];

  @Command.Boolean('-p,--parallel', { description: 'Run the commands in parallel' })
  public isParallel: boolean = false;

  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'A wrapper over foreach with -it options helping to invoke operations for changed workspaces.',
  });

  // Dependencies
  public readonly versionManager: VersionManager = new VersionManager();

  // Commands
  @Command.Path('workspaces', 'changed', 'foreach')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedList: string[] = await this.getAffectedList(project);
    if (affectedList.length === 0) {
      console.dir('No affected workspaces');
      return;
    }

    const commandList = ['workspaces', 'foreach', '-it', ...affectedList];
    if (this.isParallel) {
      commandList.push('--parallel');
    }
    await this.cli.run([...commandList, this.commandName, ...this.args]);
  }

  private async getAffectedList(project: Project): Promise<string[]> {
    const affectedNodes = await this.versionManager.findCandidates(project);
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
}
