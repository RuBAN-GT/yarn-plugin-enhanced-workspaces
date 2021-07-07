import { Package, Project, Workspace } from '@yarnpkg/core';

import { WorkspaceNode } from './models/workspace.node';

export class WorkspaceTreeResolver {
  /**
   * Get the full reverted workspaces tree (from the most deepest dependency)
   */
  public async resolve(project: Project): Promise<WorkspaceNode> {
    await project.restoreInstallState();
    return this.buildWorkspacesTree(project);
  }

  protected buildWorkspacesTree(project: Project): WorkspaceNode {
    const workspaces = this.getEssentialWorkspaces(project);
    if (workspaces.length === 0) {
      throw new Error(`Project doesn't have any essentail workspaces`);
    }

    const root = new WorkspaceNode(project.topLevelWorkspace);
    workspaces.forEach((workspace) => {
      const node = new WorkspaceNode(workspace, root);
      this.fillChildrenNodes(project, node);
      root.addChildren(node);
    });

    return root;
  }

  private getWorkspacePackage(project: Project, workspace: Workspace): Package {
    const packageData = project.storedPackages.get(workspace.anchoredLocator.locatorHash);
    if (!packageData) {
      throw new Error('Unknown workspace');
    }

    return packageData;
  }

  private getEssentialWorkspaces(project: Project): Workspace[] {
    return project.workspaces.filter((workspace) => {
      if (workspace.locator.name === project.topLevelWorkspace.locator.name) {
        return false;
      }

      return this.getWorkspaceInternalDependencies(project, workspace).size === 0;
    });
  }

  private getWorkspaceInternalDependencies(project: Project, workspace: Workspace): Set<Workspace> {
    const packageData = this.getWorkspacePackage(project, workspace);
    const workspaces: Set<Workspace> = new Set();

    [...packageData.dependencies, ...packageData.peerDependencies].forEach(([, data]) => {
      const dependency = project.tryWorkspaceByIdent(data);
      if (dependency) {
        workspaces.add(dependency);
      }
    });

    return workspaces;
  }

  private getWorkspaceExternalDependencies(project: Project, workspace: Workspace): Set<Workspace> {
    const usedWorkspaces = project.workspaces.filter((sample) => {
      const packageData = this.getWorkspacePackage(project, sample);
      return (
        packageData.dependencies.has(workspace.locator.identHash) ||
        packageData.peerDependencies.has(workspace.locator.identHash)
      );
    });

    return new Set(usedWorkspaces);
  }

  private fillChildrenNodes(project: Project, rootNode: WorkspaceNode): void {
    const dependences = this.getWorkspaceExternalDependencies(project, rootNode.workspace);
    dependences.forEach((dependency) => {
      if (rootNode.chain.has(dependency.anchoredLocator)) {
        return;
      }

      const localNode = new WorkspaceNode(dependency, rootNode);
      rootNode.addChildren(localNode);
      this.fillChildrenNodes(project, localNode);
    });
  }
}
