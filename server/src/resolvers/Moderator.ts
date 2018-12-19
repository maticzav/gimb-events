// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { ModeratorResolvers } from '../generated/graphqlgen'

export const Moderator: ModeratorResolvers.Type = {
  ...ModeratorResolvers.defaultResolvers,

  events: (parent, args, ctx) => {
    return ctx.prisma.events({
      where: {
        date_lte: new Date().toISOString(),
      },
    })
  },
}
