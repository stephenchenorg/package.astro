import type { CompanySetting } from './types'

export function createCompanySetting(companySetting: Partial<CompanySetting>) {
  return {
    lang: companySetting.lang || 'zh_TW',
    name: companySetting.name || 'Astro',
    description: companySetting.description || '',
    logo: companySetting.logo || '',
    address_1: companySetting.address_1 || '',
    address_2: companySetting.address_2 || '',
    email_1: companySetting.email_1 || '',
    email_2: companySetting.email_2 || '',
    fb_link: companySetting.fb_link || '',
    ig_link: companySetting.ig_link || '',
    line_link: companySetting.line_link || '',
    phone_1: companySetting.phone_1 || '',
    phone_2: companySetting.phone_2 || '',
    twitter_link: companySetting.twitter_link || '',
    threads_link: companySetting.threads_link || '',
  }
}
