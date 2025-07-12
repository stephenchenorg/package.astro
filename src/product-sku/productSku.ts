import type { ProductAttribute, ProductSpecification } from './types'

export class ProductSkuManager {
  /**
   * 商品規格選項列表
   */
  attributes: ProductAttribute[] = []

  /**
   * 商品規格列表
   */
  specifications: ProductSpecification[] = []

  /**
   * 已經選中商品規格選項的參數 ID
   */
  selectedSkuAttrs: Record<number, {
    itemId: number
    label: string
  }> = {}

  /**
   * 匹配到的商品規格 SKU 物件
   */
  specification: ProductSpecification | undefined = undefined

  constructor({ attributes, specifications }: {
    attributes: ProductAttribute[]
    specifications: ProductSpecification[]
  }) {
    this.attributes = attributes
    this.specifications = specifications

    // 如果...
    // 1. 只有 1 個商品規格
    // 2. 並且這個商品規格 的 combination_key 為 null，意思是這個商品不是多規格商品
    // 那麼就直接指定預設商品規格
    if (specifications.length === 1 && specifications[0].combination_key === null) {
      this.specification = specifications[0]
    }
  }

  /**
   * 選擇商品規格選項
   */
  selectSkuAttr(skuAttrId: number, skuItemId: number, label: string): void {
    this.selectedSkuAttrs[skuAttrId] = {
      itemId: skuItemId,
      label,
    }

    // 由選項組裝出 SKU 屬性 ID
    const skuAttrIds = Object.values(this.selectedSkuAttrs)
      .map(attr => attr.itemId)
      .sort((a, b) => a - b)

    // 尋找符合這個 SKU 屬性 ID 的商品規格
    this.specification = this.specifications.find(specification => specification.combination_key === skuAttrIds.join('-'))
  }

  getSpecificationLabel(): string {
    return Object.values(this.selectedSkuAttrs).map(attr => attr.label).join(', ')
  }

  /**
   * 確認商品規格選項都已經選擇
   */
  areAllSkuAttrsSelected(): boolean {
    return Object.keys(this.selectedSkuAttrs).length === this.attributes.length
  }

  /**
   * 確認商品規格還有庫存
   */
  isSpecificationInStock(stock: number): boolean {
    const specificationStock = this.specification?.inventory || 0
    return specificationStock > 0 && specificationStock >= stock
  }
}
