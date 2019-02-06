import * as moment from 'moment'
import { EventResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

import { PublicEventResolvers } from '../generated/graphqlgen'

export const PublicEvent: PublicEventResolvers.Type = {
  ...PublicEventResolvers.defaultResolvers,
  date: (parent, args, ctx) => {
    return parent.date.toString()
  },
  viewerHasTicket: {
    fragment: `fragment EventId on Event { id }`,
    resolver: async ({ id }, args, ctx) => {
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
    resolver: async ({ id }, args, ctx) => {
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
    fragment: `fragment EventDatePeriod on Event { date period }`,
    resolver: async ({ date, period }, args, ctx) => {
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
            date_gte: start.toISOString(),
            date_lte: end.toISOString(),
          },
        })

        return !hasTicket
      } catch (err) {
        return false
      }
    },
  },
}
