import { defineConfig } from 'vite';
import stylePipelineConfig from './style-pipeline.config';
import { stylePipeline } from '@snyder-tech/bdx-analog-style-pipeline-vite';

export default defineConfig({
  plugins: [...stylePipeline(stylePipelineConfig)],
});
