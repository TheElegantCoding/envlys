import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: true,
  minify: true,
  platform: 'node',
  target: 'node18',
  external: [
    'dotenv',
    'dotenv-expand',
    'zod',
    /^node:/
  ]
});