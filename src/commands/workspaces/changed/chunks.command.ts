import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { VersionManager } from '../../../core/version-manager';
import { GroupManager, groupsJsonReportConverter } from '../../../core/group-manager';
import { getMapValues } from '../../../utils/map.utils';
import { getAvailableProcessesCount } from '../../../utils/system.utils';

export class ChunksCommand extends Command<CommandContext> {
  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints affected workspaces collected by chunks',
  });

  @Command.String('-g,--group-by', {
    description: 'Slice workspaces by this number, it should be positive number',
  })
  public groupBy: string | number = getAvailableProcessesCount();

  // Dependencies
  public readonly versionManager: VersionManager = new VersionManager();
  public readonly groupManager: GroupManager = new GroupManager();

  // Commands
  @Command.Path('workspaces', 'changed', 'chunks')
  public async execute(): Promise<void> {
    this.validateInput();

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.versionManager.findCandidates(project);
    const groups = this.groupManager.flatGroups({ groupBy: +this.groupBy, input: getMapValues(affectedNodes) });

    console.dir(JSON.stringify(groupsJsonReportConverter(groups)));
  }

  private validateInput(): void {
    const sample = +this.groupBy;
    if (isNaN(sample) || sample <= 0) {
      throw new UsageError('Invalid group-by option');
    }
  }
}
