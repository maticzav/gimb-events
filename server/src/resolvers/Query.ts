import { Context, getUserId } from '../utils'
import moment = require('moment')

export const Query = {
  async viewer(parent, args, ctx: Context, info) {
    try {
      const userId = getUserId(ctx)
      return ctx.prisma.query.user({ where: { id: userId } }, info)
    } catch (err) {
      return null
    }
  },
  async ticket(parent, { id }, ctx: Context, info) {
    return ctx.prisma.query.ticket({ where: { id } }, info)
  },
  async feed(parent, args, ctx: Context, info) {
    const now = moment()
      .endOf('day')
      .toISOString()

    return ctx.prisma.query.events(
      {
        where: {
          date_gte: now,
        },
      },
      info,
    )
  },
  async event(parent, { id }, ctx: Context, info) {
    return ctx.prisma.query.event({ where: { id } }, info)
  },
  async users(parent, { query }, ctx: Context, info) {
    return ctx.prisma.query.users({ where: { email_contains: query } }, info)
  },
  async events(parent, { query }, ctx: Context, info) {
    return ctx.prisma.query.events({ where: { name_contains: query } }, info)
  },
}
