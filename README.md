# Yarn independent plugin

## Install

```sh
yarn plugin import https://raw.githubusercontent.com/RuBAN-GT/yarn-plugin-enhanced-workspaces/master/bundles/%40yarnpkg/plugin-enhanced-workspaces.js
```

## Commands

* `yarn workspaces graph` - prints monitored workspaces graph.
  * `-o, --output-format` can be `json` or `tree`
* `yarn workspaces changed list` - prints changed workspaces with related chunks.
* `yarn workspaces changed chunks` - prints changed workspaces in topological order grouped by chunks.
  * `-g, --group-by` the count of chunks, default is available machine cores
* `yarn workspaces changed foreach` - a simple wrapper over `foreach` command working only with changed workspaces. Required to have installed `@yarnpkg/plugin-workspace-tools` plugin.
  * `--include` - a list of included workspaces
  * `--exclude` - a list of excluded workspaces
  * `-p, --parallel` - run the commands in parallel
