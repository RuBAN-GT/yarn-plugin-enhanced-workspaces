import { PortablePath } from '@yarnpkg/fslib';
import { miscUtils, Project, Workspace } from '@yarnpkg/core';

// Find change workspaces using changed files list
export function findChangedWorkspaces(project: Project, changedList: PortablePath[]): Set<Workspace> {
  const changedWorkspaces: Workspace[] = miscUtils.mapAndFilter(changedList, (file) => {
    const workspace = project.tryWorkspaceByFilePath(file);
    if (workspace === null) return miscUtils.mapAndFilter.skip;

    return workspace;
  });

  return new Set(changedWorkspaces);
}
