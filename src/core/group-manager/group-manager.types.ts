import { TreeNode } from '../workspace-tree';

export type GroupRankMap<T = any> = Map<TreeNode<T>, number>;

export interface GroupManagerProps<T = any> {
  groupBy: number;
  input: TreeNode<T>[];
}

export interface GroupsChunks<T = any> {
  groupBy: number;
  data: TreeNode<T>[][];
}

export interface GroupsChunksJson {
  groupBy: number;
  data: string[][];
}
