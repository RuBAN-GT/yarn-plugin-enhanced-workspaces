import { Plugin } from '@yarnpkg/core';

import { GraphCommand } from './commands/workspaces/graph';
import { ChunksCommand, ListCommand } from './commands/workspaces/changed';
import { ForeachCommand } from './commands/workspaces/foreach';

const plugin: Plugin = {
  commands: [GraphCommand, ChunksCommand, ListCommand, ForeachCommand],
};

export default plugin;
