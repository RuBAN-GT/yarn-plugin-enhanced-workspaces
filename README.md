# Yarn independent plugin

## Requirements

**This plugin is only supported on Yarn V3 compatible version will be soon.**

## Install

```sh
yarn plugin import https://raw.githubusercontent.com/RuBAN-GT/yarn-plugin-enhanced-workspaces/master/bundles/%40yarnpkg/plugin-enhanced-workspaces.js
```

## Commands

* `yarn workspaces graph` - prints monitored workspaces graph.
  * `-o, --output-format` can be `json` or `tree`
* `yarn workspaces changed list` - prints changed workspaces with related chunks.
  * `-a, --ancestors/--no-ancestors` - performs the operation over ancestors. Default is `false`. More priority than `preserveAncestors`.
  * `--ignored-ancestors-markers` - the same as `ignoredAncestorsMarkers`
  * `--private/--no-private` - includes private workspaces into affected list. Default is `true`. More priority than `detectPrivates`.
  * `--change-detection-strategy` - which source the plugin should use in order to determine workspaces changes. Can be `base-ref`, `prev-ref` or `none`. Default is `base-ref`. More priority than `changeDetectionStrategy`.
* `yarn workspaces changed chunks` - prints changed workspaces in topological order grouped by chunks.
  * `-g, --group-by` the count of chunks, default is available machine cores
  * `-a, --ancestors/--no-ancestors` - performs the operation over ancestors. Default is `false`. More priority than `preserveAncestors`.
  * `--ignored-ancestors-markers` - the same as `ignoredAncestorsMarkers`
  * `--private/--no-private` - includes private workspaces into affected list. Default is `true`. More priority than `detectPrivates`.
  * `--change-detection-strategy` - which source the plugin should use in order to determine workspaces changes. Can be `base-ref`, `prev-ref` or `none`. Default is `base-ref`. More priority than `changeDetectionStrategy`.
* `yarn workspaces changed foreach` - a simple wrapper over `foreach` command working only with changed workspaces. Required to have installed `@yarnpkg/plugin-workspace-tools` plugin.
  * `--include` - a list of included workspaces
  * `--exclude` - a list of excluded workspaces
  * `-p, --parallel` - run the commands in parallel
  * `-a, --ancestors/--no-ancestors` - performs the operation over ancestors. Default is `false`. More priority than `preserveAncestors`.
  * `--ignored-ancestors-markers` - the same as `ignoredAncestorsMarkers`
  * `--private/--no-private` - includes private workspaces into affected list. Default is `true`. More priority than `detectPrivates`.
  * `--change-detection-strategy` - which source the plugin should use in order to determine workspaces changes. Can be `base-ref`, `prev-ref` or `none`. Default is `base-ref`. More priority than `changeDetectionStrategy`.

## Configuration

The plugin provides the next configurable options:

* `changeDetectionStrategy` - Which source the plugin should use in order to determine workspaces changes. Can be `base-ref`, `prev-ref` or `none`. Default is `base-ref`.
* `ignoredAncestorsMarkers` - If ancestor workspace contains these files/directories it will be excluded from execution list. Should be defined a string list.
* `preserveAncestors` - Preserve ancestors of changed workspaces. Should be defined as a boolean flag. Default is `false`.
* `detectPrivates` - Gather private workspaces into changed list. Should be defined as a boolean flag. Default is `true`.

## About change detection strategies

New operations from the plugin have configurable `changeDetectionStrategy` option
helping them to identify which workspaces should be utilized. Acceptable options:

* `base-ref` - only changed workspaces from [`changesetBaseRefs`](https://yarnpkg.com/configuration/yarnrc#changesetBaseRefs) refs should be utilized.
* `prev-ref` - only changed workspaces from previous commit should be utilized.
* `none` - technical option returning all workspaces.
