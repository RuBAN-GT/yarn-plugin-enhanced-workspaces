import { Locator, Project, Workspace } from '@yarnpkg/core';
import { UsageError } from 'clipanion';

import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';
import { refDetectorResolver } from './utils/ref-detector.resolver';
import { findChangedWorkspaces } from './utils/find-changed-workspaces';
import { findChangedFiles } from './utils/find-changed-files';

export class ChangeDetectionManager {
  protected readonly workspaceResolver: WorkspaceTreeResolver;

  constructor() {
    this.workspaceResolver = new WorkspaceTreeResolver();
  }

  /**
   * Find the most deepest workspaces nodes with changed files
   */
  public async findCandidates(project: Project): Promise<Map<Locator, WorkspaceNode>> {
    const changedWorkspaces = await this.findAffectedWorkspaces(project);

    // Exclude root workspace in order to avoid duplicated operations
    const affectedWorkspaces = [...changedWorkspaces].filter((w) => w !== project.topLevelWorkspace);
    if (affectedWorkspaces.length === 0) {
      return new Map();
    }

    // Take affected nodes
    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);
    return this.findAffectedNodes(treeManager, affectedWorkspaces);
  }

  protected async findAffectedWorkspaces(project: Project): Promise<Set<Workspace>> {
    if (!project.configuration.projectCwd) {
      throw new UsageError('Invalid project configuration.');
    }

    const anchorHash = await refDetectorResolver(project);
    const changedFiles = await findChangedFiles(project, anchorHash);

    return findChangedWorkspaces(project, changedFiles);
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
