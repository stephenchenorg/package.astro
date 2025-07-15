export type FormErrors = Record<string, string[]>

export interface FormRule {
  validate: (value: any) => boolean
  message: string
}
