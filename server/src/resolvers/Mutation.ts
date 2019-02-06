import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'
import { MutationResolvers } from '../generated/graphqlgen'
import {
  sendAuthenticationLink,
  sendModeratorAuthenticationLink,
} from '../sendgrid'
import { getUserId, getAuthenticationLink } from '../utils'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  login: async (parent, { email }, ctx) => {
    if (!email.endsWith('@dijaki.gimb.org')) {
      throw new Error('Uporabit moraš šolski email (@dijaki.gimb.org)!')
    }

    const user = await ctx.prisma.mutation.upsertUser({
      where: {
        email: email,
      },
      create: {
        email: email,
      },
      update: {},
    })

    /* Generate Links */
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    const link = getAuthenticationLink(token)

    /* Send emails */
    try {
      if (user.isModerator) {
        await sendModeratorAuthenticationLink(email, link.app)
      }
      await sendAuthenticationLink(email, link.web)

      return { success: true }
    } catch (err) {
      return { success: false }
    }
  },
  requestTicket: async (parent, { eventId }, ctx, info) => {
    const userId = getUserId(ctx)

    /* Obtains event information */

    const event = await ctx.prisma.query.event({ where: { id: eventId } })

    const start = moment(event.date).startOf('day')
    const end = moment(event.date).endOf('day')

    /**
     * Check whether there exists any Ticket this user owns
     * which takes place on the same date and at the same period.
     */

    const hasTicket = await ctx.prisma.exists.Ticket({
      owner: { id: userId },
      event: {
        period: event.period,
        date_lte: end.toISOString(),
        date_gte: start.toISOString(),
      },
    })

    if (hasTicket) {
      throw new Error('Dogodek se križa z nekaterimi drugimi.')
    }

    return ctx.prisma.mutation.createTicket(
      {
        data: {
          event: { connect: { id: eventId } },
          owner: { connect: { id: userId } },
          isValidated: false,
        },
      },
      info,
    )
  },
  validateTicket: async (parent, { id }, ctx, info) => {
    const validated = await ctx.prisma.exists.Ticket({ id, isValidated: true })

    if (validated) {
      throw new Error('Karta že validirana.')
    } else {
      return ctx.prisma.mutation.updateTicket(
        { where: { id: id }, data: { isValidated: true } },
        info,
      )
    }
  },
  createEvent: (parent, args, ctx, info) => {
    return ctx.prisma.mutation.createEvent(
      { data: { ...args.data, published: false } },
      info,
    )
  },
  updateEvent: async (parent, { id, data }, ctx, info) => {
    return ctx.prisma.mutation.updateEvent(
      { where: { id: id }, data: data },
      info,
    )
  },
  deleteEvent: (parent, { id }, ctx, info) => {
    return ctx.prisma.mutation.deleteEvent({ where: { id: id } }, info)
  },
  updateUser: (parent, { id, data }, ctx, info) => {
    return ctx.prisma.mutation.updateUser(
      { where: { id: id }, data: data },
      info,
    )
  },
  deleteUser: (parent, { id }, ctx, info) => {
    return ctx.prisma.mutation.deleteUser({ where: { id: id } }, info)
  },
}
