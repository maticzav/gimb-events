// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { MutationResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  login: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
  requestTicket: (parent, { event }, ctx) => {
    const userId = getUserId(ctx)

    return ctx.prisma.createTicket({
      event: { connect: { id: event } },
      owner: { connect: { id: userId } },
    })
  },
  createEvent: (parent, { data }, ctx) => {
    return ctx.prisma.createEvent(data)
  },
  updateEvent: (parent, { id, data }, ctx) => {
    return ctx.prisma.updateEvent({ where: { id }, data })
  },
  deleteEvent: (parent, { id }, ctx) => {
    return ctx.prisma.deleteEvent({ id })
  },
  addUser: (parent, { data }, ctx) => {
    return ctx.prisma.createUser(data)
  },
  updateUser: (parent, { id, data }, ctx) => {
    return ctx.prisma.updateUser({ where: { id }, data })
  },
  deleteUser: (parent, { id }, ctx) => {
    return ctx.prisma.deleteUser({ id })
  },
}
