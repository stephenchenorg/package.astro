export interface PageMeta {
  title: string
  seo_title: string | null
  seo_description: string | null
  seo_keyword: string | null
  seo_json_ld: string | null
  seo_head?: string | null
  seo_body?: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
}
