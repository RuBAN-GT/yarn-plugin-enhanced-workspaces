import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { GroupManager } from '../../../core/group-manager';
import { getMapValues } from '../../../utils/map.utils';

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
  @Command.Path('workspaces', 'changed', 'list')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.cdManager.findCandidates(project);
    const nodesList = this.groupManager.list(getMapValues(affectedNodes)).map((node) => {
      return node.name;
    });
    console.log(JSON.stringify(nodesList));
  }
}
