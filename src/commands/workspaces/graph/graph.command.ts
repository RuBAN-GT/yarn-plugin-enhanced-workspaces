import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Option, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { asTree } from 'treeify';
import { isEnum } from 'typanion';

import { GraphOutputFormat } from './graph.types';
import {
  WorkspaceTreeResolver,
  treeNodeJsonConverter,
  simpleTreeNodeConverter,
  WorkspaceNode,
} from '../../../core/workspace-tree';

export class GraphCommand extends Command<CommandContext> {
  // Meta
  public static paths: string[][] = [['workspaces', 'graph']];
  public static usage: Usage = Command.Usage({
    category: 'Workspace-related commands',
    description: 'Prints monitored workspaces graph',
  });

  // Params
  public outputFormat: GraphOutputFormat = Option.String('-o,--output-format', GraphOutputFormat.tree, {
    description: `Output format, can be 'json', 'tree'`,
    validator: isEnum(GraphOutputFormat),
  });

  // Dependencies
  public readonly workspaceResolver: WorkspaceTreeResolver = new WorkspaceTreeResolver();

  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const rootNode = await this.workspaceResolver.resolve(project);
    this.printTree(rootNode);
  }

  private printTree(node: WorkspaceNode): void {
    switch (this.outputFormat) {
      case GraphOutputFormat.json: {
        console.log(JSON.stringify(treeNodeJsonConverter(node)));
        break;
      }
      case GraphOutputFormat.tree: {
        console.log(asTree(simpleTreeNodeConverter(node), false, true));
        break;
      }
    }
  }
}
