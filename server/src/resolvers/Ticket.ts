import * as moment from 'moment'
import { TicketResolvers } from '../generated/graphqlgen'

export const Ticket: TicketResolvers.Type = {
  ...TicketResolvers.defaultResolvers,

  isExpired: {
    fragment: `fragment TicketId on Ticket { id }`,
    resolve: async ({ id }, args, ctx) => {
      const start = moment().startOf('day')

      /**
       * The ticket is expired if user already validated it,
       * or the event already took place (current date is greater than
       * the event date).
       */
      return ctx.prisma.exists.Ticket({
        id: id,
        OR: [
          { event: { date_lt: start.toISOString() } },
          { isValidated: true },
        ],
      })
    },
  },
}
