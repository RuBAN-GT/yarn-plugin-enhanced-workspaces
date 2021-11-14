import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Option, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { isEnum } from 'typanion';

import { ChangeDetectionManager } from '../../../core/change-detection-manager';
import { GroupManager } from '../../../core/group-manager';
import { getMapValues } from '../../../utils/map.utils';
import { ChangeDetectionStrategy } from '../../../types/configuration';

export class ListCommand extends Command<CommandContext> {
  // Meta
  public static paths: string[][] = [['workspaces', 'changed', 'list']];
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints workspaces that should be utilized.',
  });

  // Params
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
    });

    const nodesList = this.groupManager.list(getMapValues(affectedNodes)).map((node) => {
      return node.name;
    });
    console.log(JSON.stringify(nodesList));
  }
}
