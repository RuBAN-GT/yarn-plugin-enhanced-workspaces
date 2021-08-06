import { PortablePath } from '@yarnpkg/fslib';

import { ChangeDetectionStrategy } from '../../../types/configuration';
import { refDetectorBaseRef } from './ref-detector.base-ref';
import { refDetectorPrevRef } from './ref-detector.prev-ref';

export interface RefDetectorProps {
  projectCwd: PortablePath;
  [key: string]: any;
}

export interface RefDetectorResponse {
  commit: string;
}

export type RefDetector = (props: RefDetectorProps) => Promise<RefDetectorResponse>;

export function refDetectorBuilder(strategy: ChangeDetectionStrategy): RefDetector {
  if (strategy === ChangeDetectionStrategy.baseRef) {
    return refDetectorBaseRef;
  } else if (strategy === ChangeDetectionStrategy.prevRef) {
    return refDetectorPrevRef;
  } else {
    throw new Error(`Unknown strategy ${strategy}`);
  }
}
