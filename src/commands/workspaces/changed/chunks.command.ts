import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Option, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { applyCascade, isAtLeast, isNumber, isEnum } from 'typanion';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { GroupManager, groupsJsonReportConverter } from '../../../core/group-manager';
import { getMapValues, getAvailableProcessesCount } from '../../../utils';
import { ChangeDetectionStrategy } from '../../../types/configuration';

export class ChunksCommand extends Command<CommandContext> {
  // Meta
  public static paths: string[][] = [['workspaces', 'changed', 'chunks']];
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints affected workspaces collected by chunks',
  });

  // Params
  public groupBy: number = Option.String('-g,--group-by', getAvailableProcessesCount().toString(), {
    description: 'Slice workspaces by this number, it should be positive number',
    validator: applyCascade(isNumber(), [isAtLeast(1)]),
  });

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

  public extraList: string[] = Option.Array('--extra', [], {
    description: 'Add specific workspaces without change detection',
  });

  // Dependencies
  public readonly cdManager: ChangeDetectionManager = new ChangeDetectionManager();
  public readonly groupManager: GroupManager = new GroupManager();

  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.cdManager.findCandidates(project, {
      changeDetectionStrategy: this.changeDetectionStrategy,
      withAncestor: this.withAncestors,
      ignoredAncestorsMarkers: this.ignoredAncestorsMarkers,
      withPrivate: this.withPrivate,
      extra: this.extraList,
    });

    const groups = this.groupManager.chunks({ groupBy: +this.groupBy, input: getMapValues(affectedNodes) });
    console.log(JSON.stringify(groupsJsonReportConverter(groups)));
  }
}
