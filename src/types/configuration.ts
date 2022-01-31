export enum ChangeDetectionStrategy {
  baseRef = 'base-ref',
  prevRef = 'prev-ref',
  none = 'none',
}

declare module '@yarnpkg/core' {
  interface ConfigurationValueMap {
    changeDetectionStrategy: string;
    detectPrivates: boolean;
    ignoredAncestorsMarkers: string[];
    preserveAncestors: boolean;
    extraWorkspaces: string[];
  }
}
