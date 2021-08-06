import { Project } from '@yarnpkg/core';
import { PortablePath } from '@yarnpkg/fslib';

import { ChangeDetectionStrategy } from '../../../types/configuration';
import { refDetectorBuilder } from './ref-detector.builder';

export const refDetectorResolver = async (project: Project): Promise<string> => {
  const { configuration } = project;

  const refDetector = refDetectorBuilder(configuration.get('changeDetectionStrategy') as ChangeDetectionStrategy);
  const response = await refDetector({
    projectCwd: configuration.projectCwd as PortablePath,
    baseRefs: configuration.get('changesetBaseRefs'),
  });

  return response.commit;
};
