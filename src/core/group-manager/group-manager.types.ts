import { TreeNode } from '../workspace-tree';

export type GroupRankMap = Map<TreeNode, number>;

export interface GroupManagerProps {
  groupBy: number;
  input: TreeNode[];
}

export interface GroupsReport {
  groupBy: number;
  groups: TreeNode[][];
}

export interface GroupsJsonReport {
  groupBy: number;
  groups: string[][];
}
