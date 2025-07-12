import type { InjectionKey } from 'vue'
import type { FormValidator } from './form-validator'

export const formValidatorInjectionKey = Symbol('') as InjectionKey<FormValidator>
