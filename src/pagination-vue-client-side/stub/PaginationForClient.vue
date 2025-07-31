<template>
  <div v-if="showPagination" :class="props.class">
    <button v-if="canFirst" type="button" @click="gotoFirst">First</button>
    <button v-if="canPrev" type="button" @click="gotoPrev">Previous</button>
    <template v-for="page in items" :key="page">
      <span v-if="page === currentPage">{{ page }}</span>
      <button v-else type="button" @click="gotoPage(page)">{{ page }}</button>
    </template>
    <button v-if="canNext" type="button" @click="gotoNext">Next</button>
    <button v-if="canLast" type="button" @click="gotoLast">Last</button>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { usePagination } from '@stephenchenorg/astro/pagination-vue-client-side'

const props = defineProps<{
  total: number
  perPage?: number
  visiblePages?: number
  currentPage: number
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const {
  items,
  showPagination,
  canFirst,
  canPrev,
  canNext,
  canLast,
  gotoFirst,
  gotoPrev,
  gotoNext,
  gotoLast,
  gotoPage,
} = usePagination({
  total: () => props.total,
  perPage: () => props.perPage,
  visiblePages: () => props.visiblePages,
  currentPage: () => props.currentPage,
  onChange(page) {
    emit('update:currentPage', page)
  },
})
</script>
