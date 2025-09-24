import type { UrlConfig } from './types'
import qs from 'query-string'
import { urlConfigStore } from './store'
import { cleanParams, mergeUrlParams } from './utils'

declare global {
  interface Window {
    __astro_provide_url_config__?: UrlConfig
  }
}

export interface QueryParamsUrlOptions {
  mergeArray?: string[]
  clear?: boolean
  transformParams?: (params: Record<string, any>) => Record<string, any>
}

export function queryParamsUrl(
  additionalParams: Record<string, any>,
  urlConfig: UrlConfig = {
    baseUrl: '',
    params: {},
  },
  options: QueryParamsUrlOptions = {}
) {
  const {
    mergeArray = [],
    clear = false,
    transformParams,
  } = options

  // 如果是前端環境中，會自動從 store 中取得 urlConfig 設定
  const config = typeof window !== 'undefined'
    ? urlConfigStore.get()
    : urlConfig

  let params: Record<string, any> = {}

  if (!clear) {
    // 如果有提供 urlConfig，則使用其 params，並合併當前傳入的 additionalParams
    params = mergeUrlParams(config.params, additionalParams, {
      mergeArray,
    })

    // 如果有傳入轉換函數，則對 params 進行轉換
    if (transformParams) {
      params = transformParams(params)
    }

    // 清除 params 中含有的參數預設值
    params = cleanParams(params, config.defaultParams || {})
  }

  // 將 params 中的值轉換為 Query String 字串
  const queryString = qs.stringify(params, {
    skipEmptyString: true,
    skipNull: true,
    sort: false,
  })

  return `${config.baseUrl}${queryString ? '?' : ''}${queryString}${config.hash ? `#${config.hash}` : ''}`
}

export function parseQueryParams(search: string) {
  return qs.parse(search)
}
