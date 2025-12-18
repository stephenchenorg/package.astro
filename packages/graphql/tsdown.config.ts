import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  entry: [
    './src/example/index.ts',
  ],
  dts: true,
})
