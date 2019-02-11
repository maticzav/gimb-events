import { TicketResolvers } from '../generated/graphqlgen'

export const Ticket: TicketResolvers.Type = {
  ...TicketResolvers.defaultResolvers,

  isExpired: {
    fragment: `fragment TicketId on Ticket { id }`,
    resolve: async ({ id }, args, ctx) => {
      const now = new Date().toISOString()

      return ctx.prisma.exists.Ticket({ id: id, event: { date_lt: now } })
    },
  },
}
