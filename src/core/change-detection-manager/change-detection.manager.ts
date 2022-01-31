import { Locator, Project, Workspace } from '@yarnpkg/core';
import { UsageError } from 'clipanion';

import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';
import { refDetectorResolver } from './utils/ref-detector.resolver';
import { findChangedWorkspaces } from './utils/find-changed-workspaces';
import { findChangedFiles } from './utils/find-changed-files';
import { markersAreAvailable } from './utils/markers.helper';
import { ChangeDetectionOptions } from './models/change-detection.options';
import { ChangeDetectionStrategy } from '../../types/configuration';

type CandidatesMap = Map<Locator, WorkspaceNode>;

export class ChangeDetectionManager {
  protected readonly workspaceResolver: WorkspaceTreeResolver;

  constructor() {
    this.workspaceResolver = new WorkspaceTreeResolver();
  }

  /**
   * Find the most deepest workspaces nodes with changed files
   */
  public async findCandidates(project: Project, options: ChangeDetectionOptions = {}): Promise<CandidatesMap> {
    const { topLevelWorkspace, configuration } = project;
    let { withAncestor, withPrivate } = options;
    const { extra = [], ignoredAncestorsMarkers = [] } = options;

    const changedWorkspaces = await this.findAffectedWorkspaces(project, options.changeDetectionStrategy);

    // Exclude root an optional private workspaces
    withPrivate = withPrivate === undefined ? configuration.get('detectPrivates') : withPrivate;
    const affectedWorkspaces = [...changedWorkspaces].filter((workspace) => {
      if (workspace === topLevelWorkspace) {
        return false;
      } else {
        return !workspace.manifest.private || withPrivate;
      }
    });

    // Add extra workspaces
    const additionalList = extra.concat(configuration.get('extraWorkspaces'));
    if (additionalList.length > 0) {
      project.workspaces.forEach((workspace) => {
        if (additionalList.includes(workspace.manifest.raw.name) && !affectedWorkspaces.includes(workspace)) {
          affectedWorkspaces.push(workspace);
        }
      });
    }

    // Check empty list
    if (affectedWorkspaces.length === 0) {
      return new Map();
    }

    // Take affected nodes
    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);
    const nodes = this.findAffectedNodes(treeManager, affectedWorkspaces);

    // Calculate ancestors
    withAncestor = withAncestor === undefined ? configuration.get('preserveAncestors') : withAncestor;
    if (!withAncestor) {
      return nodes;
    }

    const configMarkers = configuration.get('ignoredAncestorsMarkers') || [];
    const result = this.mixAncestorsNodes(treeManager, nodes, ignoredAncestorsMarkers.concat(configMarkers));
    result.delete(rootNode.workspace.locator);
    return result;
  }

  protected async findAffectedWorkspaces(
    project: Project,
    changeDetectionStrategy?: ChangeDetectionStrategy,
  ): Promise<Set<Workspace>> {
    if (!project.configuration.projectCwd) {
      throw new UsageError('Invalid project configuration.');
    } else if (changeDetectionStrategy === ChangeDetectionStrategy.none) {
      return new Set(project.workspaces);
    }

    const anchorHash = await refDetectorResolver(project, changeDetectionStrategy);
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
      treeManager.findAllParents(node).forEach((bread) => {
        if (nodes.has(bread.workspace.locator) || !markersAreAvailable(bread, ignoredMarkers)) {
          fullNodes.set(bread.workspace.locator, bread);
        }
      });
    });

    return fullNodes;
  }
}
