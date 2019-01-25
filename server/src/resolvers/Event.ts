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
    fragment: `fragment EventId on Event { id numberOfTickets }`,
    resolve: async ({ id, numberOfTickets }, args, ctx: Context) => {
      const ticketsTaken = await ctx.prisma.query.ticketsConnection(
        {
          where: { event: { id: id } },
        },
        ` { aggregate { count } } `,
      )

      return ticketsTaken.aggregate.count < numberOfTickets
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
