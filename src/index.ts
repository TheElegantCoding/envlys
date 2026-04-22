import { generateEnvironmentExample } from '@src/util/generate_example.js';
import { loadEnvironmentFiles } from '@src/util/load_environment.js';
import { logger } from '@src/util/logger.js';
import { handleValidationError } from '@src/util/validate_error.js';

import type { EnvironmentOptions } from '@src/type/environment_options.js';
import type { ZodType } from 'zod';

const createEnvironment = <T extends ZodType>(schema: T, options?: EnvironmentOptions) => {
  const environment = loadEnvironmentFiles(options);
  const parsedEnvironment = schema.safeParse(process.env);

  if (parsedEnvironment.success) {
    logger.success('Environment configuration loaded successfully');

    if (options?.generateExample) {
      generateEnvironmentExample(parsedEnvironment.data as Record<string, unknown>, {
        ...options,
        currentState: environment.state,
        listEnvironment: options.listEnvironment
      });
    }

    return parsedEnvironment.data;
  }

  handleValidationError(parsedEnvironment.error);

  throw new Error('Environment validation failed');
};

export { createEnvironment };