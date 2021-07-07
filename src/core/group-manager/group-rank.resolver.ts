import { TreeNode } from '../workspace-tree';
import { GroupRankMap } from './group-manager.types';
import { findNearestParentRank } from './group-rank.utils';

export class GroupRankResolver {
  public resolve(nodes: TreeNode[]): GroupRankMap {
    const rankMap: GroupRankMap = new Map();
    this.fillSourceFragment(rankMap, nodes);

    return rankMap;
  }

  protected fillSourceFragment(rankMap: GroupRankMap, [sample, ...tail]: TreeNode[]): void {
    if (!sample) {
      return;
    }

    // Check initial workspaces
    if (!sample.parent) {
      rankMap.set(sample, 0);
      return this.fillSourceFragment(rankMap, tail);
    }

    // Find from existing map
    const [existingRank, existingNode] = findNearestParentRank(rankMap, sample);
    if (existingNode) {
      rankMap.set(sample, existingRank + 1);
    } else {
      rankMap.set(sample, 0);
    }

    if (tail.length > 0) {
      this.fillSourceFragment(rankMap, tail);
    }
  }
}
