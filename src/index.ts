import { Plugin, SettingsType } from '@yarnpkg/core';

import { ChangeDetectionStrategy } from './types/configuration';
import { GraphCommand } from './commands/workspaces/graph';
import { ChunksCommand, ListCommand } from './commands/workspaces/changed';
import { ForeachCommand } from './commands/workspaces/foreach';

const plugin: Plugin = {
  configuration: {
    changeDetectionStrategy: {
      description: 'Which source the plugin should use in order to determine workspaces changes.',
      type: SettingsType.STRING,
      isNullable: false,
      default: ChangeDetectionStrategy.baseRef,
      values: [ChangeDetectionStrategy.baseRef, ChangeDetectionStrategy.prevRef],
    },
    detectPrivates: {
      description: 'Gather private workspaces into changed list.',
      type: SettingsType.BOOLEAN,
      isNullable: false,
      default: true,
    },
    ignoredAncestorsMarkers: {
      description: 'If ancestor workspace contains these files/directories it will be excluded from execution list.',
      type: SettingsType.STRING,
      isNullable: false,
      isArray: true,
      default: [],
    },
    preserveAncestors: {
      description: 'Preserve ancestors of changed workspaces.',
      type: SettingsType.BOOLEAN,
      isNullable: false,
      default: false,
    },
  },
  commands: [GraphCommand, ChunksCommand, ListCommand, ForeachCommand],
};

export default plugin;
