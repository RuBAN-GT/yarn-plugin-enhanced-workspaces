import { chunkBy } from '../../utils/array.utils';
import { getInvertedMap } from '../../utils/map.utils';
import { TreeNode } from '../workspace-tree';
import { GroupManagerProps, GroupsReport } from './group-manager.types';
import { GroupRankResolver } from './group-rank.resolver';

export class GroupManager {
  protected rankResolver: GroupRankResolver;

  constructor() {
    this.rankResolver = new GroupRankResolver();
  }

  public flatGroups(props: GroupManagerProps): GroupsReport {
    const { groupBy, input } = props;
    let groups: TreeNode[][] = [];

    const rankMap = this.rankResolver.resolve(input);
    const invertedMap = getInvertedMap(rankMap);
    invertedMap.forEach((nodesList) => {
      const rankGroup = chunkBy(nodesList, groupBy);
      groups = [...groups, ...rankGroup];
    });

    return { groupBy, groups };
  }
}
