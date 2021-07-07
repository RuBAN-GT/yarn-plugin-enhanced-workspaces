# Yarn independent plugin

TODO

## Install

```sh
yarn plugin import URL_WILL_BE_HERE
```

## Commands

* `yarn workspaces graph` - prints monitored workspaces graph
  * `-o, --output-format` can be `json` or `tree`
* `yarn workspaces changed list` - prints changed workspaces with related chunks
* `yarn workspaces changed chunks` - prints changed workspaces in topological order grouped by chunks.
  * `-g, --group-by` the count of chunks, default is available machine cores
* `yarn workspaces changed foreach` - a simple wrapper over `foreach` command working only with changed workspaces
  * `--include` - a list of included workspaces
  * `--exclude` - a list of excluded workspaces
  * `-p, --parallel` - run the commands in parallel
