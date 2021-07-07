import { BasicNode } from '../../workspace-tree';

export class SampleNode extends BasicNode {
  public readonly id: string;
  public readonly name: string;

  constructor(id: string, parent?: SampleNode) {
    super();

    this.parent = parent;
    this.id = id;
    this.name = id;

    this.generateChain();
  }
}
