import { getMapKeys } from '../../utils/map.utils';
import { findNearestParentNode, TreeNode } from '../workspace-tree';
import { GroupRankMap } from './group-manager.types';

export function findNearestParentRank(rankMap: GroupRankMap, sample: TreeNode): [number, TreeNode | undefined] {
  const nearestNode = findNearestParentNode(sample, [...getMapKeys(rankMap)]);
  return nearestNode ? [rankMap.get(nearestNode) as number, nearestNode] : [0, undefined];
}

export function sortPrerankedTreeNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.sort((a, b) => {
    if (a.hasChildren(b)) return -1;

    const sortField = a.depth === b.depth ? 'name' : 'depth';
    return a[sortField] > b[sortField] ? 1 : -1;
  });
}
