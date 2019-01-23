import { getUserId, Context } from '../utils'

export const Event = {
  viewerHasTicket: {
    fragment: `fragment TicketID on Ticket { id }`,
    resolve: async ({ id }, args, ctx: Context) => {
      try {
        const userId = getUserId(ctx)

        return ctx.prisma.exists.Ticket({
          id,
          owner: { id: userId },
        })
      } catch (err) {
        return false
      }
    },
  },
  hasAvailableTickets: {
    fragment: `fragment TicketID on Ticket { event { id numberOfTickets } }`,
    resolve: async ({ event }, args, ctx: Context) => {
      const ticketsTaken = await ctx.prisma.query.ticketsConnection(
        {
          where: { event: { id: event.id } },
        },
        ` { aggregate { count } } `,
      )

      return ticketsTaken.aggregate.count < event.numberOfTickets
    },
  },
}
