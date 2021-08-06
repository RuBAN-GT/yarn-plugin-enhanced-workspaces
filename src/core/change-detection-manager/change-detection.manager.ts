import { Locator, Project, Workspace } from '@yarnpkg/core';
import { UsageError } from 'clipanion';

import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';
import { refDetectorResolver } from './utils/ref-detector.resolver';
import { findChangedWorkspaces } from './utils/find-changed-workspaces';
import { findChangedFiles } from './utils/find-changed-files';

type CandidatesMap = Map<Locator, WorkspaceNode>;

export class ChangeDetectionManager {
  protected readonly workspaceResolver: WorkspaceTreeResolver;

  constructor() {
    this.workspaceResolver = new WorkspaceTreeResolver();
  }

  /**
   * Find the most deepest workspaces nodes with changed files
   */
  public async findCandidates(project: Project, withAncestor: boolean = false): Promise<CandidatesMap> {
    const changedWorkspaces = await this.findAffectedWorkspaces(project);

    // Exclude root workspace in order to avoid duplicated operations
    const affectedWorkspaces = [...changedWorkspaces].filter((w) => w !== project.topLevelWorkspace);
    if (affectedWorkspaces.length === 0) {
      return new Map();
    }

    // Take affected nodes
    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);
    const nodes = this.findAffectedNodes(treeManager, affectedWorkspaces);

    return withAncestor ? this.mixAncestorsNodes(treeManager, nodes) : nodes;
  }

  protected async findAffectedWorkspaces(project: Project): Promise<Set<Workspace>> {
    if (!project.configuration.projectCwd) {
      throw new UsageError('Invalid project configuration.');
    }

    const anchorHash = await refDetectorResolver(project);
    const changedFiles = await findChangedFiles(project, anchorHash);

    return findChangedWorkspaces(project, changedFiles);
  }

  protected findAffectedNodes(treeManager: WorkspaceTreeManager, changedWorkspaces: Workspace[]): CandidatesMap {
    const affectedMap: CandidatesMap = new Map();

    treeManager.findNodesByWorkspaces(changedWorkspaces).forEach((node) => {
      const locator = node.workspace.locator;
      const existingNode = affectedMap.get(locator);

      if (!existingNode || existingNode.depth < node.depth) {
        affectedMap.set(locator, node);
      }
    });

    return affectedMap;
  }

  protected mixAncestorsNodes(treeManager: WorkspaceTreeManager, nodes: CandidatesMap): CandidatesMap {
    const fullNodes: CandidatesMap = new Map();
    nodes.forEach((node) => {
      treeManager.findNodesByIds(node.chain).forEach((node) => fullNodes.set(node.id, node));
    });

    return fullNodes;
  }
}
