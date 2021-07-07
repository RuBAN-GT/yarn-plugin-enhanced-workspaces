import { Workspace } from '@yarnpkg/core';
import TreeModel, { Node } from 'tree-model';

import { WorkspaceNode } from './models/workspace.node';

export class WorkspaceTreeManager {
  public readonly root: WorkspaceNode;

  protected tree: Node<WorkspaceNode>;

  constructor(root: WorkspaceNode) {
    this.root = root;
    this.tree = this.parseWorkspaceNode(root);
  }

  public findNodesByWorkspaces(workspaces: Workspace[]): WorkspaceNode[] {
    const nodes = this.tree.all(({ model }) => {
      return workspaces.includes(model.workspace);
    });
    return nodes.map((node) => node.model);
  }

  protected parseWorkspaceNode(rootNode: WorkspaceNode): Node<WorkspaceNode> {
    const treeManager = new TreeModel();
    return treeManager.parse(rootNode);
  }
}
