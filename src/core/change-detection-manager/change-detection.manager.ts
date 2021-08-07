import { Locator, Project, Workspace } from '@yarnpkg/core';
import { UsageError } from 'clipanion';

import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';
import { refDetectorResolver } from './utils/ref-detector.resolver';
import { findChangedWorkspaces } from './utils/find-changed-workspaces';
import { findChangedFiles } from './utils/find-changed-files';
import { markersAreAvailable } from './utils/markers.helper';

type CandidatesMap = Map<Locator, WorkspaceNode>;

export class ChangeDetectionManager {
  protected readonly workspaceResolver: WorkspaceTreeResolver;

  constructor() {
    this.workspaceResolver = new WorkspaceTreeResolver();
  }

  /**
   * Find the most deepest workspaces nodes with changed files
   */
  public async findCandidates(project: Project, withAncestor?: boolean): Promise<CandidatesMap> {
    const { topLevelWorkspace, configuration } = project;
    const changedWorkspaces = await this.findAffectedWorkspaces(project);

    // Exclude root workspace in order to avoid duplicated operations
    const affectedWorkspaces = [...changedWorkspaces].filter((w) => w !== topLevelWorkspace);
    if (affectedWorkspaces.length === 0) {
      return new Map();
    }

    // Take affected nodes
    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);
    const nodes = this.findAffectedNodes(treeManager, affectedWorkspaces);

    withAncestor = withAncestor === undefined ? configuration.get('preserveAncestors') : withAncestor;
    if (withAncestor) {
      const result = this.mixAncestorsNodes(treeManager, nodes, configuration.get('ignoredAncestorsMarkers'));
      result.delete(rootNode.workspace.locator);
      return result;
    } else {
      return nodes;
    }
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

  protected mixAncestorsNodes(
    treeManager: WorkspaceTreeManager,
    nodes: CandidatesMap,
    ignoredMarkers: string[] = [],
  ): CandidatesMap {
    const fullNodes: CandidatesMap = new Map();
    nodes.forEach((node) => {
      treeManager.findNodesByIds(node.chain).forEach((bread) => {
        if (nodes.has(bread.workspace.locator) || !markersAreAvailable(bread, ignoredMarkers)) {
          fullNodes.set(bread.workspace.locator, bread);
        }
      });
    });

    return fullNodes;
  }
}
