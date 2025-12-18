import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  entry: [
    './src/*/index.ts',
  ],
  copy: [
    { from: 'src/query-params/components', to: 'dist/query-params' },
  ],
  dts: true,
})
