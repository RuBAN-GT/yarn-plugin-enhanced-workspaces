import { Locator, Project, Workspace } from '@yarnpkg/core';

import { openVersionFile, VersionFile } from '../../utils/version.utils';
import { NoChangesError } from '../errors';
import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';

export class VersionManager {
  protected readonly workspaceResolver: WorkspaceTreeResolver;

  constructor() {
    this.workspaceResolver = new WorkspaceTreeResolver();
  }

  /**
   * Find the most deepest workspaces nodes with changed files
   */
  public async findCandidates(project: Project): Promise<Map<Locator, WorkspaceNode>> {
    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);
    const versionFile = await this.generateVersionFile(project);

    // Exclude root workspace in order to avoid duplicated operations
    const changedWorkspaces = [...versionFile.changedWorkspaces].filter((w) => w !== project.topLevelWorkspace);

    // Take affected nodes
    return this.findAffectedNodes(treeManager, changedWorkspaces);
  }

  protected async generateVersionFile(project: Project): Promise<VersionFile> {
    const versionFile = await openVersionFile(project);
    if (!versionFile) {
      throw new NoChangesError();
    }

    return versionFile;
  }

  protected findAffectedNodes(
    treeManager: WorkspaceTreeManager,
    changedWorkspaces: Workspace[],
  ): Map<Locator, WorkspaceNode> {
    const affectedMap: Map<Locator, WorkspaceNode> = new Map();

    treeManager.findNodesByWorkspaces(changedWorkspaces).forEach((node) => {
      const locator = node.workspace.locator;
      const existingNode = affectedMap.get(locator);

      if (!existingNode || existingNode.depth < node.depth) {
        affectedMap.set(locator, node);
      }
    });

    return affectedMap;
  }
}
