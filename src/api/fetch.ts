import { AwesomeGraphQLClient, GraphQLRequestError as AwesomeGraphQLRequestError } from 'awesome-graphql-client'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql/language/printer'
import { GraphQLRequestError } from './error'

export interface CreateGraphQLAPIOptions {
  endpoint: string
  defaultVariables?: Record<string, any> | (() => Record<string, any>)
}

export function createGraphQLAPI(options: CreateGraphQLAPIOptions) {
  return function graphQLAPI<
    TData extends Record<string, any>,
    TVariables extends Record<string, any> = Record<string, any>,
  >(
    query: TypedDocumentNode<TData, TVariables>,
    variables: TVariables = {} as TVariables,
  ) {
    const client = new AwesomeGraphQLClient<TypedDocumentNode>({
      endpoint: options.endpoint,
      formatQuery: (query: TypedDocumentNode) => print(query),
    })

    const defaultVariables: Record<string, any> = typeof options.defaultVariables === 'function'
      ? options.defaultVariables()
      : options.defaultVariables ?? {}

    return new Promise<TData>((resolve, reject) => {
      client
        .request<TData, TVariables>(query, {
          ...defaultVariables,
          ...variables,
        } as TVariables)
        .then(data => resolve(data))
        .catch(error => {
          if (error instanceof AwesomeGraphQLRequestError) {
            reject(new GraphQLRequestError({
              message: error.message,
              query: error.query,
              variables: error.variables,
              extensions: error.extensions,
            }))
          } else {
            reject(error)
          }
        })
    })
  }
}

export { gql } from 'graphql-tag'
