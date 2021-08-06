import { PortablePath } from '@yarnpkg/fslib';
import { execUtils } from '@yarnpkg/core';

import { RefDetector, RefDetectorProps, RefDetectorResponse } from './ref-detector.builder';

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

export const refDetectorBaseRef: RefDetector = async (props: RefDetectorProps): Promise<RefDetectorResponse> => {
  const { projectCwd, baseRefs = [] } = props;

  const latestHash = await getLatestHash(projectCwd);
  const commit = latestHash ? latestHash : await mergeBaseHash(projectCwd, baseRefs);

  return { commit };
};
