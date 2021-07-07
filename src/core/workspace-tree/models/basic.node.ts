import { TreeNode } from '../tree.types';

export abstract class BasicNode<Id = string> implements TreeNode<Id> {
  public parent?: BasicNode<Id>;
  public children: BasicNode<Id>[] = [];

  protected _chain!: Set<Id>;

  public get chain(): Set<Id> {
    return this._chain;
  }

  public abstract id: Id;
  public abstract name: string;

  public get depth(): number {
    return this._chain.size;
  }

  public addChildren(node: BasicNode<Id>): this {
    this.children.push(node);
    return this;
  }

  protected generateChain(): void {
    this._chain = new Set(this.parent?.chain);
    this._chain.add(this.id);
  }
}
