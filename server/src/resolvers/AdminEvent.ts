import { AdminEventResolvers } from '../generated/graphqlgen'

export const AdminEvent: AdminEventResolvers.Type = {
  ...AdminEventResolvers.defaultResolvers,
  date: (parent, args, ctx) => {
    return parent.date.toString()
  },
  numberOfReservations: {
    fragment: `fragment EventId on Event { id }`,
    resolver: async ({ id }, args, ctx) => {
      const events = await ctx.prisma.query.ticketsConnection(
        {
          where: {
            event: { id: id },
          },
        },
        ` { aggregate { count } } `,
      )

      return events.aggregate.count
    },
  },
  numberOfValidatedTickets: {
    fragment: `fragment EventId on Event { id }`,
    resolver: async ({ id }, args, ctx) => {
      const events = await ctx.prisma.query.ticketsConnection(
        {
          where: {
            event: { id: id },
            isValidated: true,
          },
        },
        ` { aggregate { count } } `,
      )

      return events.aggregate.count
    },
  },
}
