import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { asTree } from 'treeify';

import { GraphOutputFormat } from './graph.types';
import {
  WorkspaceTreeResolver,
  treeNodeJsonConverter,
  simpleTreeNodeConverter,
  WorkspaceNode,
} from '../../../core/workspace-tree';

export class GraphCommand extends Command<CommandContext> {
  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints monitored workspaces graph',
  });

  // Dependencies
  public readonly workspaceResolver: WorkspaceTreeResolver = new WorkspaceTreeResolver();

  // Commands
  @Command.String('-o,--output-format', {
    description: `Output format, can be 'json', 'tree'`,
  })
  public outputFormat: GraphOutputFormat = GraphOutputFormat.tree;

  @Command.Path('workspaces', 'graph')
  public async execute(): Promise<void> {
    this.validateInput();

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const rootNode = await this.workspaceResolver.resolve(project);
    this.printTree(rootNode);
  }

  private validateInput(): void {
    if (!Object.keys(GraphOutputFormat).includes(this.outputFormat)) {
      throw new UsageError(`Invalid --output-format option, can be 'json', 'tree'`);
    }
  }

  private printTree(node: WorkspaceNode): void {
    switch (this.outputFormat) {
      case GraphOutputFormat.json: {
        console.dir(JSON.stringify(treeNodeJsonConverter(node)));
        break;
      }
      case GraphOutputFormat.tree: {
        console.log(asTree(simpleTreeNodeConverter(node), false, true));
        break;
      }
    }
  }
}
