import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { GroupManager } from '../../../core/group-manager';
import { getMapValues } from '../../../utils/map.utils';
import { ChangeDetectionStrategy } from '../../../types/configuration';

export class ListCommand extends Command<CommandContext> {
  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints workspaces that should be utilized.',
  });

  // Dependencies
  public readonly cdManager: ChangeDetectionManager = new ChangeDetectionManager();
  public readonly groupManager: GroupManager = new GroupManager();

  // Commands
  @Command.String('-s,--change-detection-strategy', { description: 'Change detection strategy' })
  public changeDetectionStrategy?: ChangeDetectionStrategy;

  @Command.Boolean('-a,--ancestors', { description: 'Perform operation over ancestors' })
  public withAncestor: boolean = false;

  @Command.Array('--ignored-ancestors-markers', { description: 'The same as ignoredAncestorsMarkers' })
  public ignoredAncestorsMarkers: string[] = [];

  @Command.Boolean('--private', { description: 'Include private workspaces' })
  public withPrivate: boolean = true;

  @Command.Path('workspaces', 'changed', 'list')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestor,
      ignoredAncestorsMarkers: this.ignoredAncestorsMarkers,
      withPrivate: this.withPrivate,
    });
    const nodesList = this.groupManager.list(getMapValues(affectedNodes)).map((node) => {
      return node.name;
    });
    console.log(JSON.stringify(nodesList));
  }
}
