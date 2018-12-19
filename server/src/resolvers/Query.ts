// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { QueryResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  viewer: async (parent, args, ctx) => {
    return {}
  },
  events: (parent, args, ctx) => {
    return ctx.prisma.events({
      where: {
        date_lte: new Date().toISOString(),
        published: true,
      },
    })
  },
  event: (parent, { id }, ctx) => {
    return ctx.prisma.event({ id })
  },
}
