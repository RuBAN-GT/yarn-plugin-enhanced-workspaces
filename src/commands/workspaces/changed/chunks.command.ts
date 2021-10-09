import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { GroupManager, groupsJsonReportConverter } from '../../../core/group-manager';
import { getMapValues } from '../../../utils/map.utils';
import { getAvailableProcessesCount } from '../../../utils/system.utils';
import { ChangeDetectionStrategy } from '../../../types/configuration';

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

  @Command.Path('workspaces', 'changed', 'chunks')
  public async execute(): Promise<void> {
    this.validateInput();

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestor,
      ignoredAncestorsMarkers: this.ignoredAncestorsMarkers,
      withPrivate: this.withPrivate,
    });
    const groups = this.groupManager.chunks({ groupBy: +this.groupBy, input: getMapValues(affectedNodes) });

    console.log(JSON.stringify(groupsJsonReportConverter(groups)));
  }

  private validateInput(): void {
    const sample = +this.groupBy;
    if (isNaN(sample) || sample <= 0) {
      throw new UsageError('Invalid group-by option');
    }
  }
}
