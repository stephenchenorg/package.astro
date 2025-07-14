import type { PropType } from 'vue'
import type { FormErrors } from '../types'
import { defineComponent, onMounted, provide, watch } from 'vue'
import { FormValidator } from '../FormValidator'
import { formValidatorInjectionKey } from '../injectionKey'

export interface FormValidatorProviderExposed {
  formValidator: () => FormValidator
}

const FormValidatorProvider = defineComponent({
  name: 'FormValidatorProvider',
  props: {
    errors: {
      type: Object as PropType<FormErrors>,
      default: () => ({}),
    },
  },
  setup(props, { slots, expose }) {
    const formValidator = new FormValidator()

    provide(formValidatorInjectionKey, formValidator)

    onMounted(() => {
      formValidator.setErrors(props.errors)
    })

    watch(() => props.errors, () => {
      formValidator.setErrors(props.errors)
    }, { deep: true })

    expose<FormValidatorProviderExposed>({
      formValidator: () => formValidator,
    })

    return () => slots.default?.()
  },
})

export default FormValidatorProvider
