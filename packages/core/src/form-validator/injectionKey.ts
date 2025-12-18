import type { InjectionKey } from 'vue'
import type { FormValidator } from './FormValidator'

export const formValidatorInjectionKey = Symbol('') as InjectionKey<FormValidator>
