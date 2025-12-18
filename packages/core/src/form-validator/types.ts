export type FormErrors = Record<string, string[]>

export interface FormRule<T = any> {
  validate: (value: T, form: Record<string, any>) => boolean
  message: string
  when?: (value: T, form: Record<string, any>) => boolean
}
