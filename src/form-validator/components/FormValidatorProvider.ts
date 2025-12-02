import type { PropType, SlotsType } from 'vue'
import type { FormErrors } from '../types'
import { defineComponent, onMounted, provide, ref, shallowRef, watch } from 'vue'
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
  slots: Object as SlotsType<{
    default: {
      errors: FormErrors
      hasErrors: boolean
    }
  }>,
  setup(props, { slots, expose }) {
    const formValidator = new FormValidator()

    const errors = shallowRef<FormErrors>({})
    const hasErrors = ref(false)

    provide(formValidatorInjectionKey, formValidator)

    formValidator.onErrorsUpdated(_errors => {
      hasErrors.value = Object.keys(_errors).length > 0
      errors.value = structuredClone(_errors)
    })

    onMounted(() => {
      formValidator.setErrors(props.errors)
    })

    watch(() => props.errors, () => {
      formValidator.setErrors(props.errors)
    }, { deep: true })

    expose<FormValidatorProviderExposed>({
      formValidator: () => formValidator,
    })

    return () => slots.default?.({
      errors: errors.value,
      hasErrors: hasErrors.value,
    })
  },
})

export default FormValidatorProvider
