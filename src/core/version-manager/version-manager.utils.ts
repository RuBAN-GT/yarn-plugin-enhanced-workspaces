import { PortablePath } from '@yarnpkg/fslib';
import { execUtils, miscUtils, Project, Workspace } from '@yarnpkg/core';
import { ppath, npath } from '@yarnpkg/fslib';

async function getLatestHash(root: PortablePath): Promise<string> {
  const options = { cwd: root, strict: true };

  const { stdout } = await execUtils.execvp('git', ['describe', '--tags', '--abbrev=0'], options);
  const { stdout: latestHash } = await execUtils.execvp('git', ['rev-list', '-n', '1', stdout.trim()], options);
  return latestHash.trim();
}

async function mergeBaseHash(root: PortablePath): Promise<string> {
  const { stdout: mergeBaseStdout } = await execUtils.execvp('git', ['merge-base', 'HEAD', 'master', 'origin/master'], {
    cwd: root,
    strict: true,
  });
  return mergeBaseStdout.trim();
}

export async function findBaseCommit(root: PortablePath): Promise<string> {
  const latestHash = await getLatestHash(root);
  return latestHash ? latestHash : await mergeBaseHash(root);
}

const fileSelector = (root: PortablePath, input: string): PortablePath[] =>
  input
    .split(/\r\n|\r|\n/)
    .filter((file) => file.length > 0)
    .map((file) => ppath.resolve(root, npath.toPortablePath(file)));

export async function findChangedFiles(
  root: PortablePath,
  baseHash: string,
  projectCwd: PortablePath,
  excludeList: string[] = [],
): Promise<PortablePath[]> {
  const options = { cwd: root, strict: true };

  // Get tracked files
  const { stdout: local } = await execUtils.execvp('git', ['diff', '--name-only', `${baseHash}`], options);
  const trackedFiles = fileSelector(root, local);

  // Get untracked files
  const { stdout: untracked } = await execUtils.execvp('git', ['ls-files', '--others', '--exclude-standard'], options);
  const untrackedFiles = fileSelector(root, untracked);

  const changedFiles = [...new Set([...trackedFiles, ...untrackedFiles].sort())];
  const ignorePattern = miscUtils.buildIgnorePattern(excludeList);
  if (ignorePattern) {
    return changedFiles.filter((file) => !ppath.relative(projectCwd, file).match(ignorePattern));
  }

  return changedFiles;
}

export function findChangedWorkspaces(project: Project, changedList: PortablePath[]): Set<Workspace> {
  const changedWorkspaces: Workspace[] = miscUtils.mapAndFilter(changedList, (file) => {
    const workspace = project.tryWorkspaceByFilePath(file);
    if (workspace === null) return miscUtils.mapAndFilter.skip;

    return workspace;
  });

  return new Set(changedWorkspaces);
}
