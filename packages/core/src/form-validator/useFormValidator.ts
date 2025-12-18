import { inject } from 'vue'
import { formValidatorInjectionKey } from './injectionKey'

export function useFormValidator() {
  const formValidator = inject(formValidatorInjectionKey)
  if (!formValidator) {
    throw new Error('FormValidator must be provided in the <FormValidatorProvider> component context.')
  }
  return formValidator
}
