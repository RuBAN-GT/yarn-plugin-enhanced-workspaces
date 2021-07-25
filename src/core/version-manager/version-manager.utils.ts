import { PortablePath } from '@yarnpkg/fslib';
import { execUtils, miscUtils, Project, Workspace } from '@yarnpkg/core';
import { ppath, npath } from '@yarnpkg/fslib';

// Get latest commit hash for the actual branch
async function getLatestHash(root: PortablePath): Promise<string> {
  const options = { cwd: root, strict: false };

  const { stdout: latestTagOut } = await execUtils.execvp('git', ['describe', '--tags', '--abbrev=0'], options);
  const latestTag = latestTagOut.trim();
  if (!latestTag) {
    return '';
  }

  const { stdout: latestHash } = await execUtils.execvp('git', ['rev-list', '-n', '1', latestTag], options);
  return latestHash.trim();
}

// Find existing base ref candidates
async function findBaseCandidates(root: PortablePath, baseRefs: string[]): Promise<string[]> {
  const refs: string[] = [];
  for (const ref of baseRefs) {
    const { code } = await execUtils.execvp('git', ['merge-base', ref, 'HEAD'], { cwd: root, strict: false });
    if (code === 0) {
      refs.push(ref);
    }
  }

  return refs;
}

// Get commit hash using merge-base strategy
async function mergeBaseHash(root: PortablePath, baseRefs: string[] = []): Promise<string> {
  const baseCandidates = await findBaseCandidates(root, baseRefs);
  if (baseCandidates.length === 0) {
    return '';
  }

  const { stdout: mergeBaseStdout } = await execUtils.execvp('git', ['merge-base', 'HEAD', ...baseCandidates], {
    cwd: root,
    strict: false,
  });
  return mergeBaseStdout.trim();
}

// Find a commit hash for comparing current changes
export async function findBaseCommit(root: PortablePath, baseRefs: string[] = []): Promise<string> {
  const latestHash = await getLatestHash(root);
  return latestHash ? latestHash : await mergeBaseHash(root, baseRefs);
}

const fileSelector = (root: PortablePath, input: string): PortablePath[] =>
  input
    .split(/\r\n|\r|\n/)
    .filter((file) => file.length > 0)
    .map((file) => ppath.resolve(root, npath.toPortablePath(file)));

// Find changed files from a commit hash
export async function findChangedFiles(
  root: PortablePath,
  commitHash: string,
  projectCwd: PortablePath,
  excludeList: string[] = [],
): Promise<PortablePath[]> {
  const options = { cwd: root, strict: true };

  // Get tracked files
  const { stdout: local } = await execUtils.execvp('git', ['diff', '--name-only', commitHash], options);
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

// Find change workspaces using changed files list
export function findChangedWorkspaces(project: Project, changedList: PortablePath[]): Set<Workspace> {
  const changedWorkspaces: Workspace[] = miscUtils.mapAndFilter(changedList, (file) => {
    const workspace = project.tryWorkspaceByFilePath(file);
    if (workspace === null) return miscUtils.mapAndFilter.skip;

    return workspace;
  });

  return new Set(changedWorkspaces);
}
