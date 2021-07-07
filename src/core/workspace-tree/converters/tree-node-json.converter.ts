import { TreeNode, TreeNodeJson } from '../tree.types';

export function treeNodeJsonConverter(node: TreeNode): TreeNodeJson {
  const children: TreeNodeJson[] = [];
  node.children.forEach((child) => {
    children.push(treeNodeJsonConverter(child));
  });

  return { name: node.name, children };
}
