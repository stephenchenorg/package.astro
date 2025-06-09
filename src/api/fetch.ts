import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { APIContext } from 'astro'
import type { GraphQLFieldError, GraphQLRequestErrorOptions } from './error'
import { AwesomeGraphQLClient, GraphQLRequestError as AwesomeGraphQLRequestError } from 'awesome-graphql-client'
import { print } from 'graphql/language/printer'
import { GraphQLNotFoundError, GraphQLRequestError, GraphQLValidationError } from './error'

export interface CreateGraphQLAPIOptions {
  endpoint: string
  defaultVariables?: Record<string, any> | ((astroContext?: APIContext) => Record<string, any>)
  fetchOptions?: RequestInit | ((astroContext?: APIContext) => RequestInit)
}

export function createGraphQLAPI(globalOptions: CreateGraphQLAPIOptions) {
  const client = new AwesomeGraphQLClient<TypedDocumentNode>({
    endpoint: globalOptions.endpoint,
    formatQuery: (query: TypedDocumentNode) => print(query),
  })

  return function graphQLAPI<
    TData extends Record<string, any>,
    TVariables extends Record<string, any> = Record<string, any>,
  >(
    query: TypedDocumentNode<TData, TVariables>,
    options?: {
      variables?: TVariables
      fetchOptions?: RequestInit
      Astro?: APIContext
    },
  ): Promise<TData> {
    const { variables, fetchOptions, Astro: astroContext } = options || {}

    const defaultVariables: Record<string, any> | undefined = typeof globalOptions.defaultVariables === 'function'
      ? globalOptions.defaultVariables(astroContext)
      : globalOptions.defaultVariables

    const defaultFetchOptions: RequestInit | undefined = typeof globalOptions.fetchOptions === 'function'
      ? globalOptions.fetchOptions(astroContext)
      : globalOptions.fetchOptions

    return new Promise<TData>((resolve, reject) => {
      client
        .request<TData, TVariables>(query, {
          ...defaultVariables,
          ...variables,
        } as TVariables, {
          ...defaultFetchOptions,
          ...fetchOptions,
          headers: {
            ...defaultFetchOptions?.headers,
            ...fetchOptions?.headers,
          },
        })
        .then(data => resolve(data))
        .catch(error => {
          if (error instanceof AwesomeGraphQLRequestError) {
            const fieldError = error.fieldErrors?.[0] as GraphQLFieldError | undefined
            const code = fieldError?.code
            const errorProps = <GraphQLRequestErrorOptions>{
              code,
              message: error.message,
              query: error.query,
              variables: error.variables,
              extensions: error.extensions,
              fieldErrors: error.fieldErrors,
            }

            if (code === 404) {
              reject(new GraphQLNotFoundError(errorProps))
            } else if (code === 422) {
              reject(new GraphQLValidationError(errorProps))
            }
            reject(new GraphQLRequestError(errorProps))
          } else {
            reject(error)
          }
        })
    })
  }
}

export { gql } from 'graphql-tag'
