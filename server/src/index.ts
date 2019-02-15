import { ApolloServer } from 'apollo-server'
import * as express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'

import { Prisma } from './generated/prisma/binding'
import { resolvers, fragmentReplacements } from './resolvers'
import { typeDefs } from './schema'
import { permissions } from './shield'
import { Context } from './utils'

/* Configuration */

if (!process.env.PRISMA_ENDPOINT || !process.env.PRISMA_SECRET) {
  throw new Error('Missing Prisma configuration!')
}

/* Schema */

const {
  schema,
  fragmentReplacements: middlewareFragmentReplacements,
} = applyMiddleware(
  makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers as any }),
  permissions,
)

/* Server */

export const server = new ApolloServer({
  schema,
  debug: process.env.NODE_ENV !== 'production',
  context: ({ req }: { req: express.Request }) =>
    ({
      prisma: new Prisma({
        fragmentReplacements: [
          ...fragmentReplacements,
          ...middlewareFragmentReplacements,
        ],
        endpoint: process.env.PRISMA_ENDPOINT,
        secret: process.env.PRISMA_SECRET,
      }),
      request: req,
    } as Context),
})

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}
