import type { PropType } from 'vue'
import type { FormErrors } from '../types'
// Must be imported from the regular package path to avoid duplicate instances
import { formValidatorInjectionKey } from '@stephenchenorg/astro/form-validator'
import { defineComponent, onMounted, provide } from 'vue'
import { FormValidator } from '../FormValidator'

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
