import * as jwt from 'jsonwebtoken'
import {
  sendAuthenticationLink,
  sendModeratorAuthenticationLink,
} from '../sendgrid'
import { Context, getUserId, getAuthenticationLink } from '../utils'
import moment = require('moment')

export const Mutation = {
  async login(parent, { email }, ctx: Context, info) {
    if (!email.endsWith('@dijaki.gimb.org')) {
      return new Error('Uporabit moraš šolski email (@dijaki.gimb.org)!')
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
  async requestTicket(parent, { eventId }, ctx: Context, info) {
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
  async validateTicket(parent, { id }, ctx: Context, info) {
    const validated = await ctx.prisma.exists.Ticket({
      id,
      isValidated: true,
    })

    if (validated) {
      return new Error('Karta že validirana.')
    } else {
      return ctx.prisma.mutation.updateTicket(
        {
          where: { id: id },
          data: {
            isValidated: true,
          },
        },
        info,
      )
    }
  },
  async createEvent(parent, { data }, ctx: Context, info) {
    return ctx.prisma.mutation.createEvent(
      {
        data: {
          name: data.name,
          speaker: data.speaker,
          description: data.description,
          date: data.date,
          location: data.location,
          period: data.period,
          numberOfTickets: data.numberOfTickets,
          published: false,
        },
      },
      info,
    )
  },
  async updateEvent(parent, { id, data }, ctx: Context, info) {
    return ctx.prisma.mutation.updateEvent(
      {
        where: {
          id: id,
        },
        data: {
          name: data.name,
          speaker: data.speaker,
          description: data.description,
          date: data.date,
          location: data.location,
          period: data.period,
          numberOfTickets: data.numberOfTickets,
          published: false,
        },
      },
      info,
    )
  },
  async deleteEvent(parent, { id }, ctx: Context, info) {
    return ctx.prisma.mutation.deleteEvent(
      {
        where: {
          id: id,
        },
      },
      info,
    )
  },
  async updateUser(parent, { id, data }, ctx: Context, info) {
    return ctx.prisma.mutation.updateUser(
      {
        where: { id: id },
        data: {
          isModerator: data.isModerator,
          isAdministrator: data.isAdministrator,
        },
      },
      info,
    )
  },
  async deleteUser(parent, { id }, ctx: Context, info) {
    return ctx.prisma.mutation.deleteUser(
      {
        where: { id: id },
      },
      info,
    )
  },
}
