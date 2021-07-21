import { Locator, Project, Workspace } from '@yarnpkg/core';
import { UsageError } from 'clipanion';

import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';
import { findBaseCommit, findChangedFiles, findChangedWorkspaces } from './version-manager.utils';

export class VersionManager {
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
    const { configuration } = project;
    if (configuration.projectCwd === null) {
      throw new UsageError('Invalid project configuration.');
    }

    const rootPath = configuration.projectCwd;

    // @TODO Add strategy to configuration
    const baseHash = await findBaseCommit(configuration.projectCwd);
    if (!baseHash) {
      return new Set();
    }

    const changedFiles = await findChangedFiles(
      rootPath,
      baseHash,
      project.cwd,
      project.configuration.get('changesetIgnorePatterns'),
    );
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
