import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import { ApolloServer } from 'apollo-server'
import { Prisma } from './generated/prisma'
import { resolvers } from './resolvers'
import { Context } from './utils'
import { parse } from 'graphql'

/* Configuration */

if (!process.env.PRISMA_ENDPOINT || !process.env.PRISMA_SECRET) {
  throw new Error('Missing Prisma configuration!')
}

const typeDefs = parse(
  fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'),
)

/* Server */

export const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers as any,
  context: (req: express.Request) =>
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
