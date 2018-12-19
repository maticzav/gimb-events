// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { QueryResolvers } from '../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  viewer: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
  events: (parent, args, ctx) => {
    return ctx.prisma.events({
      where: {
        date: Date.now().toString(),
      },
    })
  },
  event: (parent, { id }, ctx) => {
    return ctx.prisma.event({ id })
  },
}
