export interface TreeNode<Id = any> {
  parent?: TreeNode<Id>;
  id: Id;
  name: string;
  chain: Set<Id>;
  depth: number;
  children: TreeNode<Id>[];
  addChildren(node: TreeNode<Id>): this;
  hasChildren(node: TreeNode<Id>): boolean;
  hasDeepChildren(node: TreeNode<Id>): boolean;
}

export interface TreeNodeJson {
  name: string;
  children: TreeNodeJson[];
}

export interface SimpleTreeNode {
  [key: string]: SimpleTreeNode;
}
