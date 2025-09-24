import { describe, test, expect } from 'vitest'
import { queryParamsUrl } from '../src/query-params/url'
import { mergeUrlParams } from '../src/query-params/utils'

describe('Query Params', () => {
  test('queryParamsUrl() basic', () => {
    const params = {
      page: 1,
      sort: 'asc',
      tags: ['tag1', 'tag2'],
    }

    const userParams = {
      page: 2,
      tags: ['tag2', 'tag3'],
    }

    const expected = 'https://example.com?page=2&sort=asc&tags=tag2&tags=tag3'
    const result = queryParamsUrl(userParams, {
      baseUrl: 'https://example.com',
      params,
    })
    expect(result).toBe(expected)
  })

  test('mergeUrlParams() basic', () => {
    const baseParams = {
      page: 1,
      sort: 'asc',
      tags: ['tag1', 'tag2'],
    }

    const userParams = {
      page: 2,
      tags: ['tag2', 'tag3'],
    }

    const expected = {
      page: 2,
      sort: 'asc',
      tags: ['tag2', 'tag3'],
    }

    const result = mergeUrlParams(baseParams, userParams)
    expect(result).toEqual(expected)
  })

  test('mergeUrlParams() with empty user params', () => {
    const baseParams = {
      page: 1,
      sort: 'asc',
      tags: ['tag1', 'tag2'],
    }

    const userParams = {}

    const expected = {
      page: 1,
      sort: 'asc',
      tags: ['tag1', 'tag2'],
    }

    const result = mergeUrlParams(baseParams, userParams)
    expect(result).toEqual(expected)
  })

  test('mergeUrlParams() with merge array', () => {
    const baseParams = {
      page: 1,
      sort: 'asc',
      tags: ['tag1', 'tag2'],
    }

    const userParams = {
      page: 2,
      tags: ['tag2', 'tag3'],
    }

    const expected = {
      page: 2,
      sort: 'asc',
      tags: ['tag1', 'tag2', 'tag3'],
    }

    const result = mergeUrlParams(baseParams, userParams, {
      mergeArray: ['tags'],
    })
    expect(result).toEqual(expected)
  })

  test('mergeUrlParams() with undefined value of user params', () => {
    const baseParams = {
      page: 1,
      sort: 'asc',
      tags: ['tag1', 'tag2'],
    }

    const userParams = {
      page: undefined,
      tags: ['tag2', 'tag3'],
    }

    const expected = {
      page: 1,
      sort: 'asc',
      tags: ['tag2', 'tag3'],
    }

    const result = mergeUrlParams(baseParams, userParams)
    expect(result).toEqual(expected)
  })

  test('mergeUrlParams() with null value of user params', () => {
    const baseParams = {
      page: 1 as number | null,
      sort: 'asc',
      tags: ['tag1', 'tag2'] as string[] | null,
    }

    const userParams = {
      page: null,
      tags: null,
    }

    const expected = {
      page: null,
      sort: 'asc',
      tags: null,
    }

    const result = mergeUrlParams(baseParams, userParams)
    expect(result).toEqual(expected)
  })
})
