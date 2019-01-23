import { Context } from '../utils'

export const Ticket = {
  isExpired: {
    fragment: `fragment TicketId on Ticket { id }`,
    resolve: async ({ id }, args, ctx: Context) => {
      const now = new Date().toISOString()

      return ctx.prisma.exists.Ticket({
        id: id,
        event: {
          date_lt: now,
        },
      })
    },
  },
}
