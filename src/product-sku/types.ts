export interface ProductAttribute {
  id: number
  title: string
  items: ProductAttributeItem[]
}

export interface ProductAttributeItem {
  id: number
  title: string
}

export interface ProductSpecification {
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
