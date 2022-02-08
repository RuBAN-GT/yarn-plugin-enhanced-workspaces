import { PortablePath } from '@yarnpkg/fslib';
import { execUtils, miscUtils, Project } from '@yarnpkg/core';
import { ppath, npath } from '@yarnpkg/fslib';

const fileSelector = (root: PortablePath, input: string): PortablePath[] =>
  input
    .split(/\r\n|\r|\n/)
    .filter((file) => file.length > 0)
    .map((file) => ppath.resolve(root, npath.toPortablePath(file)));

// Find changed files from a commit hash
export async function findChangedFiles(
  project: Project,
  commitHash?: string | undefined | null,
): Promise<PortablePath[]> {
  const root = project.configuration.projectCwd as PortablePath;
  const excludedList: string[] = (project.configuration.get('changesetIgnorePatterns') as string[]) || [];
  const options = { cwd: root, strict: true };

  // Get tracked files
  let trackedFiles: PortablePath[] = [];
  if (commitHash) {
    const { stdout: local } = await execUtils.execvp('git', ['diff', '--name-only', commitHash], options);
    trackedFiles = fileSelector(root, local);
  }

  // Get untracked files
  const { stdout: untracked } = await execUtils.execvp('git', ['ls-files', '--others', '--exclude-standard'], options);
  const untrackedFiles = fileSelector(root, untracked);

  const changedFiles = [...new Set([...trackedFiles, ...untrackedFiles].sort())];
  const ignorePattern = miscUtils.buildIgnorePattern(excludedList);
  if (ignorePattern) {
    return changedFiles.filter((file) => !ppath.relative(project.cwd, file).match(ignorePattern));
  }

  return changedFiles;
}
