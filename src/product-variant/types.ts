export interface ProductVariant {
  id: number
  /** 商品規格 Key */
  combination_key: string | null
  /** 原價 */
  listing_price: string
  /** 實際售價 */
  selling_price: string
  /** 商品庫存數量 */
  inventory: number
}

export interface ProductVariantAttribute {
  id: number
  title: string
  options: ProductVariantAttributeOption[]
}

export interface ProductVariantAttributeOption {
  id: number
  title: string
}
