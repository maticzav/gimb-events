import { getUserId, Context } from '../utils'
import moment = require('moment')

export const Event = {
  viewerHasTicket: {
    fragment: `fragment EventId on Event { id }`,
    resolve: async ({ id }, args, ctx: Context) => {
      try {
        const userId = getUserId(ctx)

        return ctx.prisma.exists.Event({
          id,
          tickets_some: { owner: { id: userId } },
        })
      } catch (err) {
        return false
      }
    },
  },
  hasAvailableTickets: {
    fragment: `fragment EventId on Event { id }`,
    resolve: async ({ id }, args, ctx: Context) => {
      const ticketsTaken = await ctx.prisma.query.ticketsConnection(
        {
          where: { event: { id: id } },
        },
        ` { aggregate { count } } `,
      )

      return ctx.prisma.exists.Event({
        id: id,
        numberOfTickets_gt: ticketsTaken.aggregate.count,
      })
    },
  },
  viewerCanRequestTicket: {
    fragment: `fragment EventId on Event { date period }`,
    resolve: async ({ date, period }, args, ctx: Context) => {
      try {
        const userId = getUserId(ctx)

        const start = moment(date).startOf('day')
        const end = moment(date).endOf('day')

        /**
         * Check whether there exists any Ticket this user owns
         * which takes place on the same date and at the same period.
         */

        const hasTicket = await ctx.prisma.exists.Ticket({
          owner: { id: userId },
          event: {
            period: period,
            date_lte: end.toISOString(),
            date_gte: start.toISOString(),
          },
        })

        return !hasTicket
      } catch (err) {
        return false
      }
    },
  },
}
