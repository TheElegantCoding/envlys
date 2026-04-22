import { logger } from '@src/util/logger.js';

import type { z } from 'zod';

const handleValidationError = (error: z.ZodError): never => {
  logger.error('Invalid environment configuration detected');

  const { fieldErrors } = error.flatten();

  Object.entries(fieldErrors).forEach(([field, errors]) => {
    const arrayErrors = Array.isArray(errors) ? errors : [errors];
    if (arrayErrors.length > 0) {
      logger.error(`Field [${field}]: ${arrayErrors.join(', ')}`);
    }
  });

  process.exit(1);
};

export { handleValidationError };