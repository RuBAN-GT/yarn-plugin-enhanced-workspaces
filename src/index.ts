import { Plugin, SettingsType } from '@yarnpkg/core';

import { ChangeDetectionStrategy } from './types/configuration';
import { GraphCommand } from './commands/workspaces/graph';
import { ChunksCommand, ListCommand } from './commands/workspaces/changed';
import { ForeachCommand } from './commands/workspaces/foreach';

const plugin: Plugin = {
  configuration: {
    changeDetectionStrategy: {
      description: 'With which source the plugin should determine workspaces changes',
      type: SettingsType.STRING,
      isNullable: false,
      default: ChangeDetectionStrategy.baseRef,
      values: [ChangeDetectionStrategy.baseRef, ChangeDetectionStrategy.prevRef],
    },
  },
  commands: [GraphCommand, ChunksCommand, ListCommand, ForeachCommand],
};

export default plugin;
