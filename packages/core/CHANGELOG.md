# Changelog

## Unreleased

Nothing yet!

## v9.0.0 - 2025-12-19

* **[BREAKING]** 將 GraphQL 相關模組移動至獨立套件 `@stephenchenorg/astro-graphql`
* 將 `api` 模組移動至 `@stephenchenorg/astro-graphql` 套件
* 將 `image` 模組移動至 `@stephenchenorg/astro-graphql` 套件
* 將 `company-setting` 模組中的 GraphQL fragment 移動至 `@stephenchenorg/astro-graphql` 套件
* 將 `page` 模組中和 GraphQL 相關的部分移動至 `@stephenchenorg/astro-graphql` 套件

### Migration

這個版本將 GraphQL 相關的模組移動至 `@stephenchenorg/astro-graphql` 套件，如果你有使用這些模組，請將部分引入路徑改為 `@stephenchenorg/astro-graphql`。

更新 `api` 模組的引入路徑：

```diff
-import type { ... } from '@stephenchenorg/astro/api'
+import type { ... } from '@stephenchenorg/astro-graphql/api'

-import { ... } from '@stephenchenorg/astro/api'
+import { ... } from '@stephenchenorg/astro-graphql/api'
```

更新 `company-setting` 模組的 fragment 引入路徑：

```diff
-import { companySettingFields } from '@stephenchenorg/astro/company-setting'
+import { companySettingFields } from '@stephenchenorg/astro-graphql/company-setting'
```

更新 `image` 模組的引入路徑：

```diff
-import type { ... } from '@stephenchenorg/astro/image'
+import type { ... } from '@stephenchenorg/astro-graphql/image'

-import { ... } from '@stephenchenorg/astro/image'
+import { ... } from '@stephenchenorg/astro-graphql/image'

-import Image from '@stephenchenorg/astro/image/components/Image.astro'
+import Image from '@stephenchenorg/astro-graphql/image/components/Image.astro'

-import ResponsiveImage from '@stephenchenorg/astro/image/components/ResponsiveImage.astro'
+import ResponsiveImage from '@stephenchenorg/astro-graphql/image/components/ResponsiveImage.astro'
```

更新 `page` 模組部分的引入路徑：

```diff
 import type {
   DataPage,
   Page,
   PageField,
   PagePlainTextField,
   PagePlainTextareaField,
   PageContentField,
   PageImageField,
-} from '@stephenchenorg/astro/page'
+} from '@stephenchenorg/astro-graphql/page'

-import { seoMetaFields } from '@stephenchenorg/astro/page'
+import { seoMetaFields } from '@stephenchenorg/astro-graphql/page'

-import { pageFields } from '@stephenchenorg/astro/page'
+import { pageFields } from '@stephenchenorg/astro-graphql/page'

 import {
   isPlainTextField,
   isPlainTextareaField,
   isContentField,
   isImageField,
   pageTextField,
   pageImageFieldForBackground
-} from '@stephenchenorg/astro/page'
+} from '@stephenchenorg/astro-graphql/page'

-import PageFieldRender from '@stephenchenorg/astro/page/components/PageFieldRender.astro'
+import PageFieldRender from '@stephenchenorg/astro-graphql/page/components/PageFieldRender.astro'
```

## v8.6.0 - 2025-12-11

* 新增 `FormValidator` 類別的 `removeRules()` 方法
* 新增 `FormField` 元件卸載時自動清除規則和錯誤訊息

## v8.5.0 - 2025-12-03

* 優化 `FormValidatorProvider` 的 slot 狀態資料

## v8.4.1 - 2025-11-18

* 調整 tsdown 設定以修復輸出檔案副檔名

## v8.4.0 - 2025-11-18

* 新增 `FormRule` 介面的泛型支援，可指定驗證值的類型

## v8.3.0 - 2025-09-25

* 增加 `mergeArray` 參數至 `queryParamsUrl()` 函數，用於指定哪些參數在合併時應該合併陣列值，以修復陣列值胃脹成更新的問題

### Migration

這個版本修改了 `queryParamsUrl()` 的預設行為，如果你希望保留舊的合併陣列行為，可以在呼叫 `queryParamsUrl()` 時，傳入 `mergeArray` 參數，並指定需要合併陣列值的參數名稱：

```ts
import { queryParamsUrl } from '@stephenchenorg/astro/query-params'

queryParamsUrl({
  category: ['value 2', 'value 3'],
}, {
  baseUrl: 'https://example.com',
  params: {
    category: ['value 1', 'value 2'],
  },
}, {
  // 指定 category 參數在合併時應該合併陣列值
  mergeArray: ['category'],
})
```

## v8.2.0 - 2025-09-20

* 增加 `<FormValidatorProvider>` 和 `<FormField>` 的 slots 定義

## v8.1.0 - 2025-08-29

* 增加 `<FormValidatorProvider>` 的 `errors` slot

## v8.0.0 - 2025-07-31

* **[BREAKING]** 新增新的 Vue 分頁元件，用於客戶端動態分頁

### Migration

如果你在使用 `pagination-vue` 模組，請將 `Pagination.astro` 元件中的引入變更為 `pagination-vue-server-side`：

```diff
-import { usePagination } from '@stephenchenorg/astro/pagination-vue'
+import { usePagination } from '@stephenchenorg/astro/pagination-vue-server-side'
```

以及刪除 `usePagination()` 導出的 `currentPage`，因為可以直接從 `props.currentPage` 取得：

```diff
 const {
   items,
   showPagination,
-  currentPage,
   canFirst,
   canPrev,
   canNext,
   canLast,
   firstUrl,
   prevUrl,
   nextUrl,
   lastUrl,
   getUrl,
 } = usePagination({
   total: props.total,
   perPage: props.perPage,
   visiblePages: props.visiblePages,
   currentPage: props.currentPage,
   url: props.url,
 })
```

## v7.2.0 - 2025-07-23

* 新增 `FormRule` 的 `when` 屬性以支援條件驗證是否啟用驗證規則

## v7.1.0 - 2025-07-23

* 新增 `validate()` 的第二個參數 `data`，用於在驗證規則中存取其他欄位的值

## v7.0.0 - 2025-07-21

* **[BREAKING]** 移除 `product-variant` 模組

## v6.1.0 - 2025-07-18

* 新增 `ProductVariantSelector` 類別中的 `isValidVariantSelected()` 方法，用於確認是否已選擇有效的商品規格

## v6.0.0 - 2025-07-16

* **[BREAKING]** 修改 Astro 與 Vue 元件的導出方式，以修復 Vite 重複導入的問題
* 新增 `form-validator` 模組中的 `useFormValidator()` composable 函數
* **[BREAKING]** 重命名 `form-validator` 模組中的 `Rule` 為 `FormRule`

### Migration

如果你有在專案中引入 Astro 或 Vue 元件，請遵照以下步驟更新：

更新 `@stephenchenorg/astro/image` 的元件導入方式：

```diff
-import { Image } from '@stephenchenorg/astro/image'
+import Image from '@stephenchenorg/astro/image/components/Image.astro'

-import { ResponsiveImage } from '@stephenchenorg/astro/image'
+import ResponsiveImage from '@stephenchenorg/astro/image/components/ResponsiveImage.astro'
```

更新 `@stephenchenorg/astro/page` 的元件導入方式：

```diff
-import { PageFieldRender } from '@stephenchenorg/astro/page'
+import PageFieldRender from '@stephenchenorg/astro/page/components/PageFieldRender.astro'
```

更新 `@stephenchenorg/astro/query-params` 的元件導入方式：

```diff
-import { ProvideUrlConfig } from '@stephenchenorg/astro/query-params'
+import ProvideUrlConfig from '@stephenchenorg/astro/query-params/components/ProvideUrlConfig.astro'
```

如果你有客製化表單欄位時，使用 `inject(formValidatorInjectionKey)` 來取得 `formValidator` 實例，請改為使用 `useFormValidator()` 函數：

```diff
-import { inject } from 'vue'
-import { formValidatorInjectionKey } from '@stephenchenorg/astro/form-validator'
+import { useFormValidator } from '@stephenchenorg/astro/form-validator'

-const formValidator = inject(formValidatorInjectionKey)
-if (!formValidator) {
-  throw new Error('FormValidator is not provided in the context.')
-}
+const formValidator = useFormValidator()
```

將 `form-validator` 模組中的 `Rule` 類型改為 `FormRule`：

```diff
-import { Rule } from '@stephenchenorg/astro/form-validator'
+import { FormRule } from '@stephenchenorg/astro/form-validator'
```

## v5.0.2 - 2025-07-15

* 修復 `form-validator` 模組內不會自動更新 `errors` 的問題

## v5.0.1 - 2025-07-13

* 修復 `ProductVariant` interface 的 `price` 屬性類型錯誤

## v5.0.0 - 2025-07-13

* **[BREAKING]** 將 `product-sku` 模組重命名為 `product-variant`，及優化屬性、方法名稱

## v4.0.3 - 2025-07-13

* 修復 `form-validator` 模組不正確的導出路徑

## v4.0.2 - 2025-07-13

* 從常規套件路徑匯入，以修復重複 instance 的問題

## v4.0.1 - 2025-07-13

* 修復 `form-validator` 模組缺失導出的型別

## v4.0.0 - 2025-07-12

* 新增 `form-validator` 模組
* 新增 `product-sku` 模組
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
