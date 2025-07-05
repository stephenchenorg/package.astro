import type { PageMeta } from '../types'

export type UseSeoMetaOptions = Partial<Omit<PageMeta, 'title'>> & {
  title: string
  description?: string | null
  image?: string | null
}

export function seoMeta(options: UseSeoMetaOptions, modelMeta?: PageMeta): PageMeta {
  return {
    title: modelMeta?.title || options.title,
    seo_title: modelMeta?.seo_title || options.seo_title || null,
    seo_description: modelMeta?.seo_description || options.seo_description || options.description || null,
    seo_keyword: modelMeta?.seo_keyword || options.seo_keyword || null,
    seo_json_ld: modelMeta?.seo_json_ld || options.seo_json_ld || null,
    seo_head: modelMeta?.seo_head || options.seo_head,
    seo_body: modelMeta?.seo_body || options.seo_body,
    og_title: modelMeta?.og_title || options.og_title || options.title || null,
    og_description: modelMeta?.og_description || options.og_description || options.description || null,
    og_image: modelMeta?.og_image || options.og_image || options.image || null,
  } satisfies PageMeta
}
