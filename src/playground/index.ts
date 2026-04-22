import { createEnvironment } from '@src/index.js';
import { logger } from '@src/util/logger.js';
import { z } from 'zod';

const testEnvironment = z.object({
  NODE_ENV: z.enum([
    'development',
    'test',
    'production'
  ], {
    error: "NODE_ENV debe ser 'development', 'test' o 'production'"
  }),
  PORT: z.coerce.number({
    error: 'El PORT debe ser un número (ej: 4321)'
  }).default(4321),
  BASE_URL: z.string({
    error: 'La BASE_URL es obligatoria para las rutas del sitio,  (ej: http://localhost:4321)'
  }).default('http://localhost:4321')
});

const { NODE_ENV, PORT, BASE_URL } = createEnvironment(testEnvironment, {
  path: './',
  generateExample: true,
  listEnvironment: [
    'development',
    'test',
    'production'
  ]
});

logger.info('Current Environment Variables:');
logger.info(`NODE_ENV: ${NODE_ENV}`);
logger.info(`PORT: ${PORT}`);
logger.info(`BASE_URL: ${BASE_URL}`);