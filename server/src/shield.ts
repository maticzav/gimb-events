import { shield, deny, rule, allow, not, or } from 'graphql-shield'

import { getUserId, Context } from './utils'

/* Rules */

const isUserAuthenticated = rule({
  cache: 'contextual',
})(async (parent, args, ctx: Context, info) => {
  try {
    getUserId(ctx)
    return true
  } catch (err) {
    return false
  }
})

const isUserAdministrator = rule({
  cache: 'contextual',
})(async (parent, args, ctx: Context, info) => {
  try {
    const userId = getUserId(ctx)

    return ctx.prisma.exists.User({
      id: userId,
      isAdministrator: true,
    })
  } catch (err) {
    return false
  }
})

const isUserModerator = rule({
  cache: 'contextual',
})(async (parent, args, ctx: Context, info) => {
  try {
    const userId = getUserId(ctx)

    return ctx.prisma.exists.User({
      id: userId,
      isModerator: true,
    })
  } catch (err) {
    return false
  }
})

const isUserTicketOwner = rule({
  cache: 'strict',
  fragment: 'fragment TicketId on Ticket { id } ',
})(async ({ id }, args, ctx: Context) => {
  try {
    const userId = getUserId(ctx)

    return ctx.prisma.exists.Ticket({
      id: id,
      owner: { id: userId },
    })
  } catch (err) {
    return false
  }
})

/* Permissions */

export const permissions = shield(
  {
    Query: {
      viewer: allow,
      ticket: allow,
      feed: allow,
      event: allow,
      users: isUserAdministrator,
      events: isUserAdministrator,
    },
    Mutation: {
      login: or(not(isUserAuthenticated), isUserAdministrator),
      requestTicket: isUserAuthenticated,
      validateTicket: allow, //or(isUserModerator, isUserAdministrator),
      createEvent: isUserAdministrator,
      updateEvent: isUserAdministrator,
      deleteEvent: isUserAdministrator,
      updateUser: isUserAdministrator,
      deleteUser: isUserAdministrator,
    },
    LoginPayload: allow,
    User: isUserAuthenticated,
    Ticket: allow, //or(isUserAdministrator, isUserModerator, isUserTicketOwner),
    Event: allow,
    AdminEvent: isUserAdministrator,
  },
  {
    debug: process.env.NODE_ENV !== 'production',
    fallbackError: 'To pa ne gre...',
    fallbackRule: deny,
  },
)
