// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { EventResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Event: EventResolvers.Type = {
  ...EventResolvers.defaultResolvers,

  viewerHasTicket: (parent, args, ctx) => {
    const userId = getUserId(ctx)

    return ctx.prisma.$exists.event({
      id: parent.id,
      tickets_some: {
        owner: { id: userId },
      },
    })
  },
}
