import { GroupsChunks, GroupsChunksJson } from '../group-manager.types';

export function groupsJsonReportConverter(input: GroupsChunks): GroupsChunksJson {
  return {
    groupBy: input.groupBy,
    data: input.data.map((chunk) => {
      return chunk.map((node) => node.name);
    }),
  };
}
