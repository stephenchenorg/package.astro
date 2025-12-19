import type { PropType, SlotsType } from 'vue'
import type { FormValidator } from '../FormValidator'
import type { FormErrors } from '../types'
import { defineComponent, onMounted, provide, ref, shallowRef, watch } from 'vue'
import { formValidatorInjectionKey } from '../injectionKey'

const FormValidatorProvider = defineComponent({
  name: 'FormValidatorProvider',
  props: {
    formValidator: {
      type: Object as PropType<FormValidator>,
      required: true,
    },
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
  setup(props, { slots }) {
    const formValidator = props.formValidator

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

    return () => slots.default?.({
      errors: errors.value,
      hasErrors: hasErrors.value,
    })
  },
})

export default FormValidatorProvider
