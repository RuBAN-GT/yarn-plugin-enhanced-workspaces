import { Locator, Workspace } from '@yarnpkg/core';

import { BasicNode } from './basic.node';

export class WorkspaceNode extends BasicNode<Locator> {
  public readonly workspace: Workspace;

  constructor(workspace: Workspace, parent?: WorkspaceNode) {
    super();

    this.parent = parent;
    this.workspace = workspace;

    this.generateChain();
  }

  public get id(): Locator {
    return this.workspace.anchoredLocator;
  }

  public get name(): string {
    return this.workspace.manifest.raw.name;
  }
}
