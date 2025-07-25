import type { FormErrors, FormRule } from './types'
import { toRaw } from 'vue'

export class FormValidator {
  rules: Record<string, FormRule[]> = {}
  errors: FormErrors = {}

  errorsUpdatedCallbacks: ((errors: FormErrors) => void)[] = []

  validate(data: Record<string, any>): boolean {
    const errors: FormErrors = {}
    let isValid = true

    for (const field in this.rules) {
      const fieldRules = this.rules[field]
      const value = data[field]

      for (const rule of fieldRules) {
        if (rule.when && !rule.when(value, data)) {
          continue
        }

        if (!rule.validate(value, data)) {
          isValid = false
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(rule.message)
          break
        }
      }
    }

    this.setErrors(errors)

    return isValid
  }

  prependRules(field: string, rules: FormRule | FormRule[]): void {
    if (!this.rules[field]) {
      this.rules[field] = []
    }
    this.rules[field].unshift(...Array.isArray(rules) ? rules : [rules])
  }

  appendRules(field: string, rules: FormRule | FormRule[]): void {
    if (!this.rules[field]) {
      this.rules[field] = []
    }
    this.rules[field].push(...Array.isArray(rules) ? rules : [rules])
  }

  setErrors(errors: FormErrors): void {
    this.errors = structuredClone(toRaw(errors))

    this.errorsUpdatedCallbacks.forEach(callback => callback(this.errors))
  }

  resetErrors(): void {
    this.setErrors({})
  }

  onErrorsUpdated(callback: (errors: FormErrors) => void): void {
    this.errorsUpdatedCallbacks.push(callback)
  }
}
