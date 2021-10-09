import { Project } from '@yarnpkg/core';
import { PortablePath } from '@yarnpkg/fslib';

import { ChangeDetectionStrategy } from '../../../types/configuration';
import { refDetectorBuilder } from './ref-detector.builder';

export async function refDetectorResolver(
  project: Project,
  changeDetectionStrategy?: ChangeDetectionStrategy,
): Promise<string> {
  const { configuration } = project;
  if (!changeDetectionStrategy) {
    changeDetectionStrategy = configuration.get('changeDetectionStrategy') as ChangeDetectionStrategy;
  }
  const refDetector = refDetectorBuilder(changeDetectionStrategy);

  const response = await refDetector({
    projectCwd: configuration.projectCwd as PortablePath,
    baseRefs: configuration.get('changesetBaseRefs'),
  });

  return response.commit;
}
