import { AwesomeGraphQLClient, GraphQLRequestError as AwesomeGraphQLRequestError } from 'awesome-graphql-client'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql/language/printer'
import { GraphQLNotFoundError, GraphQLRequestError, GraphQLValidationError } from './error'
import type { GraphQLFieldError, GraphQLRequestErrorOptions } from './error'

export interface CreateGraphQLAPIOptions {
  endpoint: string
  defaultVariables?: Record<string, any> | (() => Record<string, any>)
  headers?: Record<string, string> | (() => Record<string, string>)
}

export function createGraphQLAPI(options: CreateGraphQLAPIOptions) {
  return function graphQLAPI<
    TData extends Record<string, any>,
    TVariables extends Record<string, any> = Record<string, any>,
  >(
    query: TypedDocumentNode<TData, TVariables>,
    variables: TVariables = {} as TVariables,
  ): Promise<TData> {
    const client = new AwesomeGraphQLClient<TypedDocumentNode>({
      endpoint: options.endpoint,
      formatQuery: (query: TypedDocumentNode) => print(query),
    })

    const defaultVariables: Record<string, any> = typeof options.defaultVariables === 'function'
      ? options.defaultVariables()
      : options.defaultVariables ?? {}

    const fetchOptions = {
      headers: typeof options.headers === 'function'
        ? options.headers()
        : options.headers,
    } satisfies RequestInit

    return new Promise<TData>((resolve, reject) => {
      client
        .request<TData, TVariables>(query, {
          ...defaultVariables,
          ...variables,
        } as TVariables, fetchOptions)
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
