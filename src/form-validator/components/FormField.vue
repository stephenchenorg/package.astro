<template>
  <slot :error />
</template>

<script setup lang="ts">
import type { Rule } from '../types'
import { inject, ref } from 'vue'
import { formValidatorInjectionKey } from '../injectionKey'

const props = defineProps<{
  id: string
  rules?: Rule[]
}>()

const error = ref<string | undefined>(undefined)

const formValidator = inject(formValidatorInjectionKey)
if (!formValidator) {
  throw new Error('FormValidator is not provided in the context.')
}

if (props.rules) {
  formValidator.appendRules(props.id, props.rules)
}

formValidator.onErrorsUpdated(errors => {
  error.value = errors[props.id]?.[0]
})
</script>
