import { ContextReplacementPlugin } from 'webpack'

export const Ticket = {
  isExpired: {
    fragment: `fragment IsTicketValidated on Ticket { event { date } }`,
    resolve: async ({ event }, args, ctx: ContextReplacementPlugin, info) => {
      const now = Date.now().toLocaleString()

      return now < event.date
    },
  },
}
