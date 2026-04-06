import path from 'node:path';
import * as v from 'valibot';
import {
  defineStylePipelineProvider,
  toStyleImportId,
  type StylePipelineBuildResult,
  type StylePipelineOutput,
} from '@snyder-tech/bdx-analog-style-pipeline-core';

export interface StyleDictionaryDeclaredOutput {
  destination: string;
  kind?: StylePipelineOutput['kind'];
  scope?: StylePipelineOutput['scope'];
  inject?: boolean;
  tags?: string[];
}

export interface StyleDictionaryProviderOptions {
  configFile: string;
  outDir?: string;
  outputs: StyleDictionaryDeclaredOutput[];
}

export const styleDictionaryDeclaredOutputSchema = v.strictObject({
  destination: v.string(),
  kind: v.optional(
    v.picklist(['css', 'theme', 'tokens', 'manifest', 'typescript']),
  ),
  scope: v.optional(v.picklist(['global', 'component', 'theme'])),
  inject: v.optional(v.boolean()),
  tags: v.optional(v.array(v.string())),
});

export const styleDictionaryProviderOptionsSchema = v.strictObject({
  configFile: v.string(),
  outDir: v.optional(v.string()),
  outputs: v.array(styleDictionaryDeclaredOutputSchema),
});

export function styleDictionaryProvider(
  options: StyleDictionaryProviderOptions,
) {
  return defineStylePipelineProvider(
    'style-dictionary',
    options,
    async (context, resolvedOptions): Promise<StylePipelineBuildResult> => {
      const outDir = path.resolve(
        context.workspaceRoot,
        resolvedOptions.outDir ?? '.bdx/style-dictionary',
      );

      const outputs = resolvedOptions.outputs.map(
        (output, index): StylePipelineOutput => {
          const absolutePath = path.resolve(outDir, output.destination);
          const rootRelativePath = path.relative(
            context.workspaceRoot,
            absolutePath,
          );
          const isCss = absolutePath.endsWith('.css');

          return {
            id: `style-dictionary:${output.destination}`,
            provider: 'style-dictionary',
            kind: output.kind ?? (isCss ? 'css' : 'tokens'),
            scope: output.scope ?? 'global',
            order: index,
            absolutePath,
            rootRelativePath,
            importId: isCss ? toStyleImportId(rootRelativePath) : null,
            inject: isCss && output.inject !== false,
            tags: output.tags ?? [],
            metadata: {
              configFile: resolvedOptions.configFile,
            },
          };
        },
      );

      return {
        outputs,
        watchFiles: [path.resolve(context.workspaceRoot, resolvedOptions.configFile)],
      };
    },
    styleDictionaryProviderOptionsSchema,
  );
}
