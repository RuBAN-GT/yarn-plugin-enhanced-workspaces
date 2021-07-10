import { TreeNode } from '../workspace-tree';

export type GroupRankMap = Map<TreeNode, number>;

export interface GroupManagerProps {
  groupBy: number;
  input: TreeNode[];
}

export interface GroupsChunks {
  groupBy: number;
  data: TreeNode[][];
}

export interface GroupsChunksJson {
  groupBy: number;
  data: string[][];
}
