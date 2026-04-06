import { defineStylePipelineConfig } from '@snyder-tech/bdx-analog-style-pipeline-core';
import { styleDictionaryProvider } from '@snyder-tech/bdx-analog-style-pipeline-style-dictionary-provider';
import { pandaProvider } from '@snyder-tech/bdx-analog-style-pipeline-panda-provider';
import { tokiforgeProvider } from '@snyder-tech/bdx-analog-style-pipeline-tokiforge-provider';

export default defineStylePipelineConfig({
  providers: [
    styleDictionaryProvider({
      configFile: 'style-dictionary.config.ts',
      outputs: [
        {
          destination: 'css/tokens.css',
          inject: true,
          tags: ['tokens', 'tailwind', 'primeng', 'spartan'],
        },
        {
          destination: 'css/web-awesome.css',
          inject: false,
          tags: ['web-awesome'],
        },
      ],
    }),
    pandaProvider({
      configFile: 'panda.config.ts',
    }),
    tokiforgeProvider({
      configFile: 'tokiforge.config.ts',
    }),
  ],
});
