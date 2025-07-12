# Changelog

## Unreleased

* 新增 `form-validator` 模組
* `query-params` 模組支援 `hash` 屬性

## v3.1.1 - 2025-07-10

* 修復 `mergeUrlParams()` 函數在傳入 `null` 值時，沒有覆蓋陣列值的行為

## v3.1.0 - 2025-07-08

* 新增 `queryParamsUrl()` 函數的 `clear` 參數

## v3.0.1 - 2025-07-05

* 修復缺失的 `seo_description` 屬性

## v3.0.0 - 2025-06-09

* **[BREAKING]** 將 `pagination` 模組更名為 `pagination-astro`
* 新增 `pagination-vue` 模組，且會作為預設的分頁模組

### Migration

原本的 `pagination` 模組已經更名為 `pagination-astro`，如果你在使用 `pagination` 模組，請將 `Pagination.astro` 元件中的引入變更為 `pagination-astro`：

```diff
-import { usePagination } from '@stephenchenorg/astro/pagination'
+import { usePagination } from '@stephenchenorg/astro/pagination-astro'
```

## v2.0.0 - 2025-05-25

* **[BREAKING]** 將 `graphQLAPI()` 函數參數全部移至 `options` 物件中
* `createGraphQLAPI()` 函數新增注入 Astro 上下文變數

### Migration

v1.x 版本中的 `graphQLAPI()` 函數參數分別是 `query`, `variables`, `fetchOptions`：

```ts
import { gql, graphQLAPI } from '@/api'

const data = await graphQLAPI<Data>(gql`
  ...
`, { slug: 'article-slug' }, {
  headers: {
    'Content-Type': 'application/json',
  },
})
```

而在 v2.0 中 `graphQLAPI()` 函數為了支援注入 Astro 上下文變數，因而將參數調整為 `options` 物件：

```ts
const data = await graphQLAPI<Data>(gql`
  ...
`, {
  variables: { slug: 'article-slug' },
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})
```

## v1.6.0 - 2025-05-06

* 更新 `nanostores` 版本至 `^1.0`

## v1.5.0 - 2025-03-27

* 改進 `graphQLAPI()` 函數

## v1.4.0 - 2025-03-27

* 更新 GraphQL 錯誤處理

## v1.3.0 - 2025-03-27

* 新增 graphQLAPI 的 headers 參數

## v1.2.4 - 2025-03-25

* 新增 `GraphQLRequestExtensions` 關於 validation Error 的文字訊息

## v1.2.3 - 2025-03-08

* 修復 query params 讀取錯誤的 `urlConfigStore`

## v1.2.2 - 2025-03-04

* 修復 `<ResponsiveImage>` 元件顯示在 HTML 的 blur 屬性

## v1.2.1 - 2025-03-04

* 重命名 `seoMeta()` 函數的參數名稱

## v1.2.0 - 2025-03-03

* 新增 `createCompanySetting()` 輔助函數

## v1.1.2 - 2025-03-03

* 修復 `graphQLAPI()` 函數缺少回傳類型

## v1.1.1 - 2025-03-03

* 調整 `createGraphQLAPI()` 函數

## v1.1.0 - 2025-03-03

* 新增 `createGraphQLAPI()` 函數

## v1.0.1 - 2025-03-03

* 將 `@graphql-typed-document-node/core` 移至 `dependencies`

## v1.0.0 - 2025-03-03

* 模組：`api`
* 模組：`company-setting`
* 模組：`image`
* 模組：`page`
* 模組：`pagination`
* 模組：`query-params`
