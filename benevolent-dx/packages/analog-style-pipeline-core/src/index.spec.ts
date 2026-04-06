import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import {
  StylePipelineValidationError,
  customStylePipelineProvider,
  defineStylePipelineConfig,
  sortOutputs,
  toStyleImportId,
  validateOptionsWithSchema,
} from './index.js';

describe('style-pipeline-core', () => {
  it('creates stable virtual import ids', () => {
    expect(toStyleImportId('themes/app.css')).toBe(
      'virtual:style-pipeline/file/themes/app.css',
    );
  });

  it('keeps provider config strongly typed at runtime', async () => {
    const provider = customStylePipelineProvider({
      name: 'custom-theme',
      async build() {
        return {
          outputs: [
            {
              id: 'theme',
              provider: 'custom',
              kind: 'theme',
              scope: 'theme',
              order: 2,
              absolutePath: '/tmp/theme.css',
              rootRelativePath: 'tmp/theme.css',
              importId: toStyleImportId('tmp/theme.css'),
              inject: true,
              tags: ['theme'],
            },
          ],
        };
      },
    });

    const config = defineStylePipelineConfig({
      providers: [provider],
    });
    const result = await config.providers[0].build({
      workspaceRoot: '/workspace',
      projectRoot: '/workspace/apps/demo',
      mode: 'development',
      command: 'serve',
    });

    expect(sortOutputs(result.outputs)[0]?.provider).toBe('custom');
  });

  it('validates provider options through Standard Schema contracts', async () => {
    const schema = v.object({
      configFile: v.string(),
      inject: v.optional(v.boolean()),
    });

    await expect(
      validateOptionsWithSchema(schema, {
        configFile: 'tokens.config.ts',
        inject: true,
      }),
    ).resolves.toEqual({
      configFile: 'tokens.config.ts',
      inject: true,
    });

    await expect(
      validateOptionsWithSchema(schema, {
        inject: 'yes',
      }),
    ).rejects.toBeInstanceOf(StylePipelineValidationError);
  });
});
