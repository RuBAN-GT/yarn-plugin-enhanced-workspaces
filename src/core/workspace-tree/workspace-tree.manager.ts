import { Workspace, Locator } from '@yarnpkg/core';
import TreeModel, { Node } from 'tree-model';

import { WorkspaceNode } from './models/workspace.node';

export class WorkspaceTreeManager {
  public readonly root: WorkspaceNode;

  protected tree: Node<WorkspaceNode>;

  constructor(root: WorkspaceNode) {
    this.root = root;
    this.tree = this.parseWorkspaceNode(root);
  }

  public findAllParents(node: WorkspaceNode): WorkspaceNode[] {
    return this.tree
      .all(({ model }) => node.chain.has(model.id) || model.children.some((c: WorkspaceNode) => c.id === node.id))
      .map((node) => node.model);
  }

  public findNodesByIds(ids: Set<Locator>): WorkspaceNode[] {
    return this.tree.all(({ model }) => ids.has(model.id)).map((node) => node.model);
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
