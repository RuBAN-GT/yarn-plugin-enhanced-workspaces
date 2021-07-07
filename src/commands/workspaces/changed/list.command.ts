import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { VersionManager } from '../../../core/version-manager';

export class ListCommand extends Command<CommandContext> {
  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints workspaces that should be utilized.',
  });

  @Command.Boolean('-v,--verbose', {
    description: 'Print detailed workspaces parent chunks',
  })
  public verbose: boolean = false;

  // Dependencies
  public readonly versionManager: VersionManager = new VersionManager();

  // Commands
  @Command.Path('workspaces', 'changed', 'list')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.versionManager.findCandidates(project);

    const chains: string[][] = [];
    affectedNodes.forEach((node) => {
      if (this.verbose) {
        const chain: string[] = [...node.chain].map((locator) => {
          const { manifest } = project.getWorkspaceByLocator(locator);
          return manifest.raw.name;
        });
        chains.push(chain);
      } else {
        chains.push([node.name]);
      }
    });

    console.dir('Affected chains:');
    chains.forEach((chain) => console.dir(chain.join(' → ')));
  }
}
