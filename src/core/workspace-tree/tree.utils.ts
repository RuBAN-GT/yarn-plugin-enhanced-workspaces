import { TreeNode } from './tree.types';

export function findNearestParentNode(sample: TreeNode, nodes: TreeNode[]): TreeNode | undefined {
  let parentNode: TreeNode | undefined = undefined;

  sample.chain.forEach((parentId) => {
    const existingNode = nodes.find((node) => node.id === parentId);
    if (existingNode && (!parentNode || existingNode.depth > parentNode.depth)) {
      parentNode = existingNode;
    }
  });

  return parentNode;
}
