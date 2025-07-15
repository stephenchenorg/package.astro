import type { PropType } from 'vue'
import type { FormValidator } from '../FormValidator'
import type { Rule } from '../types'
import { defineComponent, ref } from 'vue'
import { useFormValidator } from '../useFormValidator'

export interface FormValidatorProviderExposed {
  formValidator: () => FormValidator
}

const FormField = defineComponent({
  name: 'FormField',
  props: {
    id: {
      type: String,
      required: true,
    },
    rules: {
      type: Object as PropType<Rule[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const error = ref<string | undefined>(undefined)

    const formValidator = useFormValidator()

    if (props.rules) {
      formValidator.appendRules(props.id, props.rules)
    }

    formValidator.onErrorsUpdated(errors => {
      error.value = errors[props.id]?.[0]
    })

    return () => slots.default?.({
      error: error.value,
    })
  },
})

export default FormField
