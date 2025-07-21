import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/api/index.ts',
    './src/company-setting/index.ts',
    './src/form-validator/index.ts',
    './src/image/index.ts',
    './src/page/index.ts',
    './src/pagination-astro/index.ts',
    './src/pagination-vue/index.ts',
    './src/query-params/index.ts',
  ],
  copy: [
    { from: 'src/image/components', to: 'dist/image/components' },
    { from: 'src/page/components', to: 'dist/page/components' },
    { from: 'src/query-params/components', to: 'dist/query-params/components' },
  ],
  dts: true,
})
