export interface TreeNode<Id = any> {
  parent?: TreeNode<Id>;
  id: Id;
  name: string;
  chain: Set<Id>;
  depth: number;
  children: TreeNode<Id>[];
}

export interface TreeNodeJson {
  name: string;
  children: TreeNodeJson[];
}

export interface SimpleTreeNode {
  [key: string]: SimpleTreeNode;
}
