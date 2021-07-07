import { SimpleTreeNode, TreeNode } from '../tree.types';

function generaneNestedNodes(node: TreeNode): SimpleTreeNode {
  const children: any = node.children?.length > 0 ? {} : null;
  node.children.forEach((value) => {
    children[value.name] = generaneNestedNodes(value);
  });

  return children;
}

export function simpleTreeNodeConverter(node: TreeNode): SimpleTreeNode {
  return { [node.name]: generaneNestedNodes(node) };
}
