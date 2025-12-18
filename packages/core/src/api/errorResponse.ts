import { GraphQLNotFoundError } from './error'

export function handleErrorResponse(e: unknown): Response | undefined {
  if (e instanceof GraphQLNotFoundError) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    })
  }
}
