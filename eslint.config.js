import ycs77, {
  GLOB_ASTRO,
  GLOB_ASTRO_JS,
  GLOB_ASTRO_TS,
  GLOB_SRC,
} from '@ycs77/eslint-config'

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
  .append({
    files: [GLOB_ASTRO],
    rules: {
      'style/indent': 'off',
    },
  })
  .append({
    files: [GLOB_ASTRO_JS, GLOB_ASTRO_TS],
    rules: {
      'style/semi': 'off',
    },
  })
