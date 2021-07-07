export class NoChangesError extends Error {
  constructor() {
    super('No changes');
  }
}
