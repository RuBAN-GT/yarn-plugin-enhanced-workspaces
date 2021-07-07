import { getMapKeys } from '../../utils/map.utils';
import { findNearestParentNode, TreeNode } from '../workspace-tree';
import { GroupRankMap } from './group-manager.types';

export function findNearestParentRank(rankMap: GroupRankMap, sample: TreeNode): [number, TreeNode | undefined] {
  const nearestNode = findNearestParentNode(sample, [...getMapKeys(rankMap)]);
  return nearestNode ? [rankMap.get(nearestNode) as number, nearestNode] : [0, undefined];
}
