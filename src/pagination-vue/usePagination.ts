import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

export function usePagination(options: {
  total: MaybeRefOrGetter<number>
  currentPage: MaybeRefOrGetter<number>
  url: string
  perPage?: MaybeRefOrGetter<number>
  visiblePages?: MaybeRefOrGetter<number>
}) {
  const total = computed(() => toValue(options.total))
  const currentPage = computed(() => toValue(options.currentPage))
  const perPage = computed(() => toValue(options.perPage || 12))

  const totalPages = computed(() => Math.ceil(total.value / perPage.value))
  const visiblePages = computed(() => Math.min(toValue(options.visiblePages || 5), totalPages.value))
  const sideCount = computed(() => Math.floor(visiblePages.value / 2))

  const items = computed(() => {
    const items: number[] = []

    let start = Math.max(1, currentPage.value - sideCount.value)
    let end = Math.min(totalPages.value, currentPage.value + sideCount.value)

    if (end - start + 1 < visiblePages.value && currentPage.value > 0) {
      if (currentPage.value <= sideCount.value) {
        end = Math.min(totalPages.value, start + visiblePages.value - 1)
      } else if (currentPage.value > totalPages.value - sideCount.value) {
        start = Math.max(1, end - visiblePages.value + 1)
      }
    }

    for (let i = start; i <= end; i++) {
      items.push(i)
    }

    return items
  })

  function getUrl(page: number) {
    const url = new URL(options.url)
    url.searchParams.set('page', String(page))
    return url.toString()
  }

  return {
    items,
    showPagination: computed(() => total.value > perPage.value),
    currentPage,
    canFirst: computed(() => currentPage.value > 1),
    canPrev: computed(() => currentPage.value > 1),
    canNext: computed(() => currentPage.value < totalPages.value),
    canLast: computed(() => currentPage.value < totalPages.value),
    firstUrl: computed(() => getUrl(1)),
    prevUrl: computed(() => getUrl(currentPage.value - 1)),
    nextUrl: computed(() => getUrl(currentPage.value + 1)),
    lastUrl: computed(() => getUrl(totalPages.value)),
    getUrl,
  }
}
