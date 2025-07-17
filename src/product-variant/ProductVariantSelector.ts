import type { ProductVariant, ProductVariantAttribute } from './types'

export class ProductVariantSelector {
  /**
   * 可用的商品變體列表（所有 SKU）
   */
  availableVariants: ProductVariant[] = []

  /**
   * 商品屬性選項列表（如顏色、尺寸等）
   */
  variantAttributes: ProductVariantAttribute[] = []

  /**
   * 使用者已選擇的屬性值
   */
  selectedAttributes: Record<number, {
    optionId: number
    label: string
  }> = {}

  /**
   * 匹配到的商品規格物件
   */
  currentVariant: ProductVariant | undefined = undefined

  constructor({ availableVariants, variantAttributes }: {
    availableVariants: ProductVariant[]
    variantAttributes: ProductVariantAttribute[]
  }) {
    this.availableVariants = availableVariants
    this.variantAttributes = variantAttributes

    // 如果...
    // 1. 只有 1 個商品規格
    // 2. 並且這個商品規格 的 combination_key 為 null，意思是這個商品不是多規格商品
    // 那麼就直接指定預設商品規格
    if (availableVariants.length === 1 && availableVariants[0].combination_key === null) {
      this.currentVariant = availableVariants[0]
    }
  }

  /**
   * 選擇商品規格
   */
  selectVariant(attributeId: number, optionId: number, label: string): void {
    this.selectedAttributes[attributeId] = { optionId, label }

    // 由選項組裝出商品規格 Key
    const variantCombinationKey = Object.values(this.selectedAttributes)
      .map(attr => attr.optionId)
      .sort((a, b) => a - b)
      .join('-')

    // 尋找符合的商品規格
    this.currentVariant = this.availableVariants.find(variant => variant.combination_key === variantCombinationKey)
  }

  /**
   * 獲取已選擇的商品規格選項標籤
   */
  getSelectedAttributesLabel(): string {
    return Object.values(this.selectedAttributes).map(attr => attr.label).join(', ')
  }

  /**
   * 確認是否已選擇所有商品規格選項
   */
  areAllAttributesSelected(): boolean {
    return Object.keys(this.selectedAttributes).length === this.variantAttributes.length
  }

  /**
   * 確認是否已選擇有效的商品規格
   */
  isValidVariantSelected(): boolean {
    return typeof this.currentVariant !== 'undefined' && this.currentVariant.inventory > 0
  }

  /**
   * 確認是否有足夠的庫存
   */
  hasEnoughStock(stock: number): boolean {
    const specificationStock = this.currentVariant?.inventory || 0
    return specificationStock > 0 && specificationStock >= stock
  }
}
