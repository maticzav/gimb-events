import * as moment from 'moment'
import { QueryResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  viewer: async (parent, args, ctx, info) => {
    try {
      const userId = getUserId(ctx)
      return ctx.prisma.query.user({ where: { id: userId } }, info)
    } catch (err) {
      return null
    }
  },
  ticket: async (parent, { id }, ctx, info) => {
    return ctx.prisma.query.ticket({ where: { id } }, info)
  },
  feed: async (parent, args, ctx, info) => {
    const now = moment()
      .startOf('day')
      .toISOString()

    return ctx.prisma.query.events(
      { where: { date_gte: now, published: true } },
      info,
    )
  },
  event: async (parent, { id }, ctx, info) => {
    return ctx.prisma.query.event({ where: { id } }, info)
  },
  users: async (parent, { query }, ctx, info) => {
    return ctx.prisma.query.users(
      { where: { email_contains: query }, first: 10 },
      info,
    )
  },
  events: async (parent, { query }, ctx, info) => {
    return ctx.prisma.query.events(
      { where: { name_contains: query }, orderBy: 'date_DESC', first: 10 },
      info,
    )
  },
}
