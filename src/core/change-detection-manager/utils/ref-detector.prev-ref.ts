import { execUtils } from '@yarnpkg/core';

import { RefDetector, RefDetectorProps, RefDetectorResponse } from './ref-detector.builder';

export const refDetectorPrevRef: RefDetector = async (props: RefDetectorProps): Promise<RefDetectorResponse> => {
  const { projectCwd } = props;
  const options = { cwd: projectCwd, strict: false };

  const { stdout } = await execUtils.execvp('git', ['rev-parse', 'HEAD'], options);
  return { commit: stdout.trim() };
};
