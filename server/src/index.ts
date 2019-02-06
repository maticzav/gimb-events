import { GraphQLServer } from 'graphql-yoga'

import { Prisma } from './generated/prisma/binding'
import { resolvers, fragmentReplacements } from './resolvers'
import { permissions } from './shield'
import { Context } from './utils'

/* Configuration */

if (!process.env.PRISMA_ENDPOINT || !process.env.PRISMA_SECRET) {
  throw new Error('Missing Prisma configuration!')
}

/* Server */

export const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: resolvers,
  middlewares: [permissions],
  context: ({
    request,
    fragmentReplacements: middlewareFragmentReplacements,
  }) =>
    ({
      prisma: new Prisma({
        fragmentReplacements: [
          ...fragmentReplacements,
          ...middlewareFragmentReplacements,
        ],
        endpoint: process.env.PRISMA_ENDPOINT,
        secret: process.env.PRISMA_SECRET,
      }),
      request: request,
    } as Context),
})

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  server
    .start({
      debug: process.env.NODE_ENV !== 'production',
    })
    .then(({ address }) => {
      console.log(`🚀  Server ready at ${address}`)
    })
}
