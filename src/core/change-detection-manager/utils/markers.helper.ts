import { ppath, xfs } from '@yarnpkg/fslib';

import { WorkspaceNode } from '../../workspace-tree/models/workspace.node';

export function markersAreAvailable(node: WorkspaceNode, markers: string[]): boolean {
  if (!markers || markers.length === 0) {
    return false;
  }

  const { workspace } = node;
  return markers.some((marker: any) => {
    const markerPath = ppath.join(workspace.cwd, marker);
    return xfs.existsSync(markerPath);
  });
}
