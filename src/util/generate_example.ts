import { logger } from '@src/util/logger.js';
import fs from 'node:fs';
import { resolve } from 'node:path';

type GenerateEnvironmentExampleOptions = {
  path?: string;
  fileName?: string;
  currentState?: string;
  listEnvironment?: string[];
};

const generateEnvironmentFile = (data: Record<string, unknown>, options?: GenerateEnvironmentExampleOptions) => {
  const environmentFilePath = resolve(process.cwd(), options?.path ?? '', options?.fileName ?? `.env.${options?.currentState}`);

  const exampleContent = Object.entries(data)
    .map(([key, value]) => {
      const exampleValue = value === undefined ? `<${key}>` : value as string;
      return `${key}=${exampleValue}`;
    })
    .join('\n');

  fs.writeFileSync(environmentFilePath, exampleContent);
  logger.success(`Example file generated: ${options?.fileName}`);
};

const generateEnvironmentExample = (data: Record<string, unknown>, options?: GenerateEnvironmentExampleOptions) => {
  if (options?.listEnvironment && options.listEnvironment.length > 0) {
    for (const environment of options.listEnvironment) {
      const fileName = `.env.${environment}.example`;
      generateEnvironmentFile(data, { ...options, fileName });
    }
  } else {
    generateEnvironmentFile(data, options);
  }
};

export { generateEnvironmentExample };