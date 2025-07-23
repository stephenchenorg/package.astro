export type FormErrors = Record<string, string[]>

export interface FormRule {
  validate: (value: any, form: Record<string, any>) => boolean
  message: string
}
