import { getUserId, Context } from '../utils'
import moment = require('moment')

export const AdminEvent = {
  numberOfReservations: {
    fragment: `fragment EventId on Event { id }`,
    resolve: async ({ id }, args, ctx: Context) => {
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
    resolve: async ({ id }, args, ctx: Context) => {
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
