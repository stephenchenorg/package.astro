export type FormErrors = Record<string, string[]>

export interface Rule {
  validate: (value: any) => boolean
  message: string
}
