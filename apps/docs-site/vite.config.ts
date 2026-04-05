/// <reference types="vitest" />

import analog from "@analogjs/platform";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  root: __dirname,
  publicDir: "src/public",
  assetsInclude: ["**/*.wasm", "**/*.wasm?module", "**/*.wasm?url"],
  build: {
    outDir: "../../dist/apps/docs-site/client",
    emptyOutDir: true,
    reportCompressedSize: true,
    target: ["es2024"],
  },
  resolve: {
    mainFields: ["module"],
  },
  plugins: [
    analog({
      content: {
        highlighter: "prism",
      },
      experimental: {
        useAngularCompilationAPI: true,
        typedRouter: false,
      },
    }),
    tailwindcss(),
  ],
  test: {
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/apps/docs-site",
      provider: "v8",
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    include: ["**/*.spec.ts"],
  },
}));
