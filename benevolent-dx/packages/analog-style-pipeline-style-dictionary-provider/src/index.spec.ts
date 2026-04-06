import { describe, expect, it } from 'vitest';
import { styleDictionaryProvider } from './index.js';

describe('styleDictionaryProvider', () => {
  it('maps declared outputs into style pipeline outputs', async () => {
    const provider = styleDictionaryProvider({
      configFile: 'style-dictionary.config.ts',
      outputs: [
        {
          destination: 'css/tokens.css',
          tags: ['tokens', 'tailwind'],
        },
      ],
    });

    const result = await provider.build({
      workspaceRoot: '/workspace',
      projectRoot: '/workspace/apps/demo',
      mode: 'development',
      command: 'serve',
    });

    expect(result.outputs[0]?.provider).toBe('style-dictionary');
    expect(result.outputs[0]?.importId).toBe(
      'virtual:style-pipeline/file/node_modules/.analog/style-dictionary/css/tokens.css',
    );
    expect(result.watchFiles).toEqual(['/workspace/style-dictionary.config.ts']);
  });
});
