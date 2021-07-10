import { chunkBy } from '../../utils/array.utils';
import { getInvertedMap } from '../../utils/map.utils';
import { TreeNode } from '../workspace-tree';
import { GroupManagerProps, GroupsChunks } from './group-manager.types';
import { GroupRankResolver } from './group-rank.resolver';

export class GroupManager {
  protected rankResolver: GroupRankResolver;

  constructor() {
    this.rankResolver = new GroupRankResolver();
  }

  public list(nodes: TreeNode[]): TreeNode[] {
    let data: TreeNode[] = [];

    const rankMap = this.rankResolver.resolve(nodes);
    getInvertedMap(rankMap).forEach((nodesList) => {
      data = data.concat(nodesList);
    });

    return data;
  }

  public chunks(props: GroupManagerProps): GroupsChunks {
    const { groupBy, input } = props;
    let data: TreeNode[][] = [];

    const rankMap = this.rankResolver.resolve(input);
    getInvertedMap(rankMap).forEach((nodesList) => {
      const rankGroup = chunkBy(nodesList, groupBy);
      data = data.concat(rankGroup);
    });

    return { groupBy, data };
  }
}
