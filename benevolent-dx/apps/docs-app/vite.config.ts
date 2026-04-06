import { fileURLToPath } from 'node:url';
import analog from '@analogjs/platform';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: __dirname,
  publicDir: 'src/public',
  build: {
    outDir: '../../dist/apps/docs-app/client',
    emptyOutDir: true,
    reportCompressedSize: true,
    target: ['es2024'],
  },
  resolve: {
    alias: {
      '@snyder-tech/bdx-analog-docs-angular': fileURLToPath(
        new URL(
          '../../packages/analog-docs-angular/src/index.ts',
          import.meta.url,
        ),
      ),
      '@snyder-tech/bdx-analog-markdown-pipeline': fileURLToPath(
        new URL(
          '../../packages/analog-markdown-pipeline/src/index.ts',
          import.meta.url,
        ),
      ),
    },
  },
  plugins: [
    analog({
      experimental: {
        useAngularCompilationAPI: true,
      },
    }),
    tailwindcss(),
  ],
}));
