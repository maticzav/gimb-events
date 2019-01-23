import { Context, getUserId } from '../utils'

export const Query = {
  async viewer(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx)

    return ctx.prisma.query.user({ where: { id: userId } }, info)
  },
  async feed(parent, args, ctx: Context, info) {
    const now = new Date().toISOString()

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
}
