import { cpus } from 'os';

export const getAvailableProcessesCount = (): number => Math.max(1, cpus().length / 2);
