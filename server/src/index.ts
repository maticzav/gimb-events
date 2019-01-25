import { ApolloServer } from 'apollo-server'
import * as express from 'express'
import * as fs from 'fs'
import { parse } from 'graphql'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'
import * as path from 'path'

import { Prisma } from './generated/prisma'
import { resolvers } from './resolvers'
import { permissions } from './shield'
import { Context } from './utils'

/* Configuration */

if (!process.env.PRISMA_ENDPOINT || !process.env.PRISMA_SECRET) {
  throw new Error('Missing Prisma configuration!')
}

/* Schema */

const typeDefs = parse(
  fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'),
)

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions,
)

/* Server */

export const server = new ApolloServer({
  schema,
  debug: process.env.NODE_ENV !== 'production',
  context: ({ req }: { req: express.Request }) =>
    ({
      prisma: new Prisma({
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
