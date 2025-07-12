import type { UrlConfig } from './types'
import { atom } from 'nanostores'

export const urlConfigStore = atom<UrlConfig>({
  baseUrl: '',
  hash: '',
  params: {},
  defaultParams: {},
})
