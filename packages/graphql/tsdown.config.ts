import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  entry: [
    './src/*/index.ts',
  ],
  copy: [
    { from: 'src/image/components', to: 'dist/image' },
    { from: 'src/page/components', to: 'dist/page' },
  ],
  dts: true,
})
