import { getUserId, Context } from '../utils'

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
    fragment: `fragment EventId on Event { id }`,
    resolve: async ({ id }, args, ctx: Context) => {
      try {
        const userId = getUserId(ctx)

        // TODO:

        return true
      } catch (err) {
        return false
      }
    },
  },
}
