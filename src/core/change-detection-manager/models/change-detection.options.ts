import { ChangeDetectionStrategy } from '../../../types/configuration';

export interface ChangeDetectionOptions {
  changeDetectionStrategy?: ChangeDetectionStrategy;
  ignoredAncestorsMarkers?: string[];
  withAncestor?: boolean;
  withPrivate?: boolean;
  extra?: string[];
}
