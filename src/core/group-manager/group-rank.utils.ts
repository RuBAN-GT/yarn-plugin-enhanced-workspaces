import { getMapKeys } from '../../utils';
import { TreeNode } from '../workspace-tree';
import { GroupRankMap } from './group-manager.types';

// @TODO Union two loops into one
export function findNearestParentRank<T>(
  rankMap: GroupRankMap,
  sample: TreeNode<T>,
): [number, TreeNode<T> | undefined] {
  const nodes = [...getMapKeys(rankMap)];

  let forecastRank: number = 0;
  let candidate: TreeNode | undefined = undefined;
  nodes.forEach((node) => {
    const rank = rankMap.get(node) as number;
    if (node.hasChildren(sample) && (!candidate || node.depth > candidate.depth || rank > forecastRank)) {
      forecastRank = rank;
      candidate = node;
    }
  });
  sample.chain.forEach((parentId) => {
    const existingNode = nodes.find((node) => node.id === parentId);
    if (existingNode && (!candidate || existingNode.depth > candidate.depth)) {
      candidate = existingNode;
    }
  });

  return candidate ? [rankMap.get(candidate) as number, candidate] : [0, undefined];
}

export function sortPrerankedTreeNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.sort((a, b) => {
    if (a.hasChildren(b)) return -1;

    const sortField = a.depth === b.depth ? 'name' : 'depth';
    return a[sortField] > b[sortField] ? 1 : -1;
  });
}
