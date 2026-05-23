import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import type { EnvironmentOptions } from '@src/type/environment_options.js';

const loadEnvironmentFiles = (options?: EnvironmentOptions) => {
  const currentState = process.env.NODE_ENV ?? 'development';
  const environmentFilePath = resolve(process.cwd(), options?.path ?? '', options?.fileName ?? `.env.${currentState}`);

  if (existsSync(environmentFilePath)) {
    const config = dotenv.config({ path: environmentFilePath, quiet: true });
    expand(config);
    return { path: environmentFilePath, state: currentState, source: 'file' as const };
  }

  return { state: currentState, source: 'process.env' as const };
};

export { loadEnvironmentFiles };
