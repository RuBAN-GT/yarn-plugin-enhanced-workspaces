export enum ChangeDetectionStrategy {
  baseRef = 'base-ref',
  prevRef = 'prev-ref',
}

declare module '@yarnpkg/core' {
  interface ConfigurationValueMap {
    changeDetectionStrategy: string;
    preserveAncestors: boolean;
    ignoredAncestorsMarkers: string[];
  }
}
