import { GroupsJsonReport, GroupsReport } from '../group-manager.types';

export function groupsJsonReportConverter(input: GroupsReport): GroupsJsonReport {
  return {
    groupBy: input.groupBy,
    groups: input.groups.map((chunk) => {
      return chunk.map((node) => node.name);
    }),
  };
}
