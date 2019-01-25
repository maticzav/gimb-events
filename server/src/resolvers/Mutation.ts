import * as jwt from 'jsonwebtoken'
import { sendAuthenticationLink } from '../sendgrid'
import { Context, getUserId, getAuthenticationLink } from '../utils'

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

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    const link = getAuthenticationLink(token)

    const res = await sendAuthenticationLink(email, link.web)

    if (res.status === 'ok') {
      return { success: true }
    } else {
      return { success: false }
    }
  },
  async requestTicket(parent, { eventId }, ctx: Context, info) {
    const userId = getUserId(ctx)

    // TODO: karte, ki se krizajo

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
      return ctx.prisma.mutation.updateTicket({
        where: { id: id },
        data: {
          isValidated: true,
        },
      })
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
