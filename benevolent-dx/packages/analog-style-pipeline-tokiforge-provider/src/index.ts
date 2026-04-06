import path from 'node:path';
import * as v from 'valibot';
import {
  defineStylePipelineProvider,
  toStyleImportId,
  type StylePipelineBuildResult,
  type StylePipelineOutput,
} from '@snyder-tech/bdx-analog-style-pipeline-core';

export interface TokiforgeProviderOptions {
  configFile: string;
  themeCssFile?: string;
  runtimeManifestFile?: string;
}

export const tokiforgeProviderOptionsSchema = v.strictObject({
  configFile: v.string(),
  themeCssFile: v.optional(v.string()),
  runtimeManifestFile: v.optional(v.string()),
});

export function tokiforgeProvider(options: TokiforgeProviderOptions) {
  return defineStylePipelineProvider(
    'tokiforge',
    options,
    async (context, resolvedOptions): Promise<StylePipelineBuildResult> => {
      const themeCssFile =
        resolvedOptions.themeCssFile ?? '.tokiforge/theme.css';
      const runtimeManifestFile =
        resolvedOptions.runtimeManifestFile ?? '.tokiforge/runtime-theme.json';

      const cssAbsolutePath = path.resolve(context.workspaceRoot, themeCssFile);
      const cssRootRelativePath = path.relative(
        context.workspaceRoot,
        cssAbsolutePath,
      );
      const runtimeAbsolutePath = path.resolve(
        context.workspaceRoot,
        runtimeManifestFile,
      );
      const runtimeRootRelativePath = path.relative(
        context.workspaceRoot,
        runtimeAbsolutePath,
      );

      const outputs: StylePipelineOutput[] = [
        {
          id: 'tokiforge:theme.css',
          provider: 'tokiforge',
          kind: 'theme',
          scope: 'theme',
          order: 0,
          absolutePath: cssAbsolutePath,
          rootRelativePath: cssRootRelativePath,
          importId: toStyleImportId(cssRootRelativePath),
          inject: true,
          tags: ['tokiforge', 'theme', 'runtime'],
          metadata: {
            configFile: resolvedOptions.configFile,
          },
        },
        {
          id: 'tokiforge:runtime-manifest',
          provider: 'tokiforge',
          kind: 'manifest',
          scope: 'theme',
          order: 1,
          absolutePath: runtimeAbsolutePath,
          rootRelativePath: runtimeRootRelativePath,
          importId: null,
          inject: false,
          tags: ['tokiforge', 'runtime'],
          metadata: {
            configFile: resolvedOptions.configFile,
          },
        },
      ];

      return {
        outputs,
        watchFiles: [path.resolve(context.workspaceRoot, resolvedOptions.configFile)],
      };
    },
    tokiforgeProviderOptionsSchema,
  );
}
