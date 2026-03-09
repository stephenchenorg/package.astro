import { describe, expect, test } from 'vitest'
import { FormValidator } from '../src/form-validator/FormValidator'

describe('FormValidator - field value extraction', () => {
  test('should use direct access when field exists in data', () => {
    const validator = new FormValidator()
    validator.appendRules('name', {
      validate: value => value === 'test',
      message: 'Name must be test',
    })

    const result = validator.validate({ name: 'test' })
    expect(result).toBe(true)
    expect(validator.errors).toEqual({})
  })

  test('should use direct access even when field value is undefined', () => {
    const validator = new FormValidator()
    validator.appendRules('name', {
      validate: value => value === undefined,
      message: 'Name must be undefined',
    })

    const result = validator.validate({ name: undefined })
    expect(result).toBe(true)
    expect(validator.errors).toEqual({})
  })

  test('should use objectDotProp for nested fields', () => {
    const validator = new FormValidator()
    validator.appendRules('address.city', {
      validate: value => value === 'Taipei',
      message: 'City must be Taipei',
    })

    const result = validator.validate({ address: { city: 'Taipei' } })
    expect(result).toBe(true)
    expect(validator.errors).toEqual({})
  })

  test('should distinguish between direct field and nested path', () => {
    const validator = new FormValidator()

    // Test that direct field takes precedence over nested path
    validator.appendRules('user.name', {
      validate: value => value === 'direct',
      message: 'Must be direct',
    })

    // When 'user.name' exists as a direct key
    const result1 = validator.validate({ 'user.name': 'direct' })
    expect(result1).toBe(true)

    // When only nested path exists
    validator.resetErrors()
    const result2 = validator.validate({ user: { name: 'direct' } })
    expect(result2).toBe(true)
  })
})

describe('FormValidator - conditional validation with when()', () => {
  test('should skip validation when when() returns false', () => {
    const validator = new FormValidator()
    validator.appendRules('email', {
      validate: value => value.includes('@'),
      message: 'Email must contain @',
      when: value => value !== '',
    })

    const result = validator.validate({ email: '' })
    expect(result).toBe(true)
    expect(validator.errors).toEqual({})
  })

  test('should validate when when() returns true', () => {
    const validator = new FormValidator()
    validator.appendRules('email', {
      validate: value => value.includes('@'),
      message: 'Email must contain @',
      when: value => value !== '',
    })

    const result = validator.validate({ email: 'invalid' })
    expect(result).toBe(false)
    expect(validator.errors).toEqual({ email: ['Email must contain @'] })
  })
})
