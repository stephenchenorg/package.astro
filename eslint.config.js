import ycs77, { GLOB_SRC } from '@ycs77/eslint-config'

export default ycs77({
  astro: true,
  typescript: true,
})
  .append({
    files: [GLOB_SRC],
    rules: {
      'antfu/top-level-function': 'off',
    },
  })
