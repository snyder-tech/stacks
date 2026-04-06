import { readFile } from 'node:fs/promises';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  defineStylePipelineConfig,
  sortOutputs,
  toStyleImportId,
  type StylePipelineBuildResult,
  type StylePipelineConfig,
  type StylePipelineContext,
  type StylePipelineOutput,
} from '@snyder-tech/bdx-analog-style-pipeline-core';

const DEFAULT_MANIFEST_MODULE_ID = 'virtual:style-pipeline';
const DEFAULT_CSS_MODULE_ID = 'virtual:style-pipeline.css';
const FILE_PREFIX = 'virtual:style-pipeline/file/';
const RESOLVED_MANIFEST_ID = '\0style-pipeline:manifest';
const RESOLVED_CSS_ID = '\0style-pipeline:css';
const RESOLVED_FILE_PREFIX = '\0style-pipeline:file/';

interface StylePipelineState {
  outputs: StylePipelineOutput[];
  injectedCss: string;
  watchFiles: string[];
}

export { DEFAULT_CSS_MODULE_ID, DEFAULT_MANIFEST_MODULE_ID };

export function stylePipeline(
  config: StylePipelineConfig,
): Plugin[] {
  const normalized = defineStylePipelineConfig(config);
  const manifestModuleId =
    normalized.manifestModuleId ?? DEFAULT_MANIFEST_MODULE_ID;
  const cssModuleId = normalized.cssModuleId ?? DEFAULT_CSS_MODULE_ID;
  let resolved: ResolvedConfig;
  let state: StylePipelineState | undefined;

  return [
    {
      name: 'snyder-tech-style-pipeline',
      enforce: 'pre',
      configResolved(next) {
        resolved = next;
      },
      async buildStart() {
        state = await buildState(normalized, resolved);
      },
      configureServer(server) {
        void buildState(normalized, resolved).then((nextState) => {
          state = nextState;
          server.watcher.add(nextState.watchFiles);
        });
      },
      resolveId(id) {
        if (id === manifestModuleId) {
          return RESOLVED_MANIFEST_ID;
        }

        if (id === cssModuleId) {
          return RESOLVED_CSS_ID;
        }

        if (id.startsWith(FILE_PREFIX)) {
          return `${RESOLVED_FILE_PREFIX}${id.slice(FILE_PREFIX.length)}`;
        }

        return null;
      },
      async load(id) {
        if (!state) {
          state = await buildState(normalized, resolved);
        }

        if (id === RESOLVED_MANIFEST_ID) {
          const outputsByTag = groupOutputsByTag(state.outputs);
          return [
            `export const outputs = ${JSON.stringify(state.outputs)};`,
            `export const outputsByTag = ${JSON.stringify(outputsByTag)};`,
            `export const cssModuleId = ${JSON.stringify(cssModuleId)};`,
            'export function getOutputsByTag(tag) {',
            '  return outputsByTag[tag] ?? [];',
            '}',
            'export default outputs;',
          ].join('\n');
        }

        if (id === RESOLVED_CSS_ID) {
          return state.injectedCss;
        }

        if (id.startsWith(RESOLVED_FILE_PREFIX)) {
          const relativeImport = id.slice(RESOLVED_FILE_PREFIX.length);
          const output = state.outputs.find(
            (candidate) => candidate.importId === `${FILE_PREFIX}${relativeImport}`,
          );
          if (!output) {
            return null;
          }
          return readFile(output.absolutePath, 'utf-8');
        }

        return null;
      },
      async transformIndexHtml() {
        if (
          normalized.injectDefaultCss === false ||
          !state?.outputs.some((output) => output.inject)
        ) {
          return [];
        }

        return [
          {
            tag: 'script',
            attrs: { type: 'module' },
            children: `import ${JSON.stringify(cssModuleId)};`,
            injectTo: 'head-prepend',
          },
        ];
      },
    },
  ];
}

async function buildState(
  config: StylePipelineConfig,
  resolved: ResolvedConfig,
): Promise<StylePipelineState> {
  const context: StylePipelineContext = {
    workspaceRoot: resolved.root,
    projectRoot: resolved.root,
    mode:
      resolved.mode === 'test'
        ? 'test'
        : resolved.command === 'build'
          ? 'production'
          : 'development',
    command: resolved.command === 'build' ? 'build' : 'serve',
  };

  const results = await Promise.all(
    config.providers.map((provider) => provider.build(context)),
  );
  const outputs = sortOutputs(results.flatMap((result) => result.outputs));
  const injectedCss = await readInjectedCss(outputs);
  const watchFiles = results.flatMap((result) => result.watchFiles ?? []);

  return {
    outputs,
    injectedCss,
    watchFiles,
  };
}

async function readInjectedCss(
  outputs: readonly StylePipelineOutput[],
): Promise<string> {
  const injected = outputs.filter((output) => output.inject);
  const chunks = await Promise.all(
    injected.map(async (output) => {
      const content = await readFile(output.absolutePath, 'utf-8');
      return `/* ${output.rootRelativePath} */\n${content}`;
    }),
  );

  return chunks.join('\n\n');
}

function groupOutputsByTag(
  outputs: readonly StylePipelineOutput[],
): Record<string, StylePipelineOutput[]> {
  const grouped: Record<string, StylePipelineOutput[]> = {};

  for (const output of outputs) {
    for (const tag of output.tags) {
      grouped[tag] ??= [];
      grouped[tag].push(output);
    }
  }

  return grouped;
}

export { toStyleImportId };
export type {
  StylePipelineBuildResult,
  StylePipelineConfig,
  StylePipelineContext,
  StylePipelineOutput,
};
