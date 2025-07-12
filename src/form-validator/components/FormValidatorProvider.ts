import type { PropType } from 'vue'
import type { FormErrors } from '../types'
import { defineComponent, onMounted, provide } from 'vue'
import { FormValidator } from '../form-validator'
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

    expose<FormValidatorProviderExposed>({
      formValidator: () => formValidator,
    })

    return () => slots.default?.()
  },
})

export default FormValidatorProvider
