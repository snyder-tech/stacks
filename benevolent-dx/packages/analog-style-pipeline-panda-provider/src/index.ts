import path from 'node:path';
import * as v from 'valibot';
import {
  defineStylePipelineProvider,
  toStyleImportId,
  type StylePipelineBuildResult,
  type StylePipelineOutput,
} from '@snyder-tech/bdx-analog-style-pipeline-core';

export interface PandaProviderOptions {
  configFile: string;
  outDir?: string;
  emitCss?: boolean;
  emitTokens?: boolean;
}

export const pandaProviderOptionsSchema = v.strictObject({
  configFile: v.string(),
  outDir: v.optional(v.string()),
  emitCss: v.optional(v.boolean()),
  emitTokens: v.optional(v.boolean()),
});

export function pandaProvider(options: PandaProviderOptions) {
  return defineStylePipelineProvider(
    'panda',
    options,
    async (context, resolvedOptions): Promise<StylePipelineBuildResult> => {
      const outDir = path.resolve(
        context.workspaceRoot,
        resolvedOptions.outDir ?? 'styled-system',
      );
      const outputs: StylePipelineOutput[] = [];
      let order = 0;

      if (resolvedOptions.emitCss !== false) {
        const absolutePath = path.resolve(outDir, 'styles.css');
        const rootRelativePath = path.relative(context.workspaceRoot, absolutePath);
        outputs.push({
          id: 'panda:styles.css',
          provider: 'panda',
          kind: 'css',
          scope: 'global',
          order: order++,
          absolutePath,
          rootRelativePath,
          importId: toStyleImportId(rootRelativePath),
          inject: false,
          tags: ['panda', 'css'],
          metadata: {
            configFile: resolvedOptions.configFile,
          },
        });
      }

      if (resolvedOptions.emitTokens !== false) {
        const absolutePath = path.resolve(outDir, 'tokens/index.ts');
        const rootRelativePath = path.relative(context.workspaceRoot, absolutePath);
        outputs.push({
          id: 'panda:tokens',
          provider: 'panda',
          kind: 'typescript',
          scope: 'theme',
          order: order++,
          absolutePath,
          rootRelativePath,
          importId: null,
          inject: false,
          tags: ['panda', 'tokens'],
          metadata: {
            configFile: resolvedOptions.configFile,
          },
        });
      }

      return {
        outputs,
        watchFiles: [path.resolve(context.workspaceRoot, resolvedOptions.configFile)],
      };
    },
    pandaProviderOptionsSchema,
  );
}
