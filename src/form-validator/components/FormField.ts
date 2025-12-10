import type { PropType, SlotsType } from 'vue'
import type { FormRule } from '../types'
import { defineComponent, onBeforeUnmount, ref } from 'vue'
import { useFormValidator } from '../useFormValidator'

const FormField = defineComponent({
  name: 'FormField',
  props: {
    id: {
      type: String,
      required: true,
    },
    rules: {
      type: Object as PropType<FormRule[]>,
      default: () => [],
    },
  },
  slots: Object as SlotsType<{
    default: {
      error: string | null
    }
  }>,
  setup(props, { slots }) {
    const error = ref<string | null>(null)

    const formValidator = useFormValidator()

    if (props.rules) {
      formValidator.appendRules(props.id, props.rules)
    }

    formValidator.onErrorsUpdated(errors => {
      error.value = errors[props.id]?.[0] || null
    })

    onBeforeUnmount(() => {
      formValidator.removeRules(props.id)

      // 清除該欄位的錯誤訊息
      const currentErrors = { ...formValidator.errors }
      delete currentErrors[props.id]
      formValidator.setErrors(currentErrors)
    })

    return () => slots.default?.({
      error: error.value,
    })
  },
})

export default FormField
