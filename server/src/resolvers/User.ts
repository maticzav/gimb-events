// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { UserResolvers } from '../generated/graphqlgen'

import { getUserId } from '../utils'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  tickets: async (parent, args, ctx, info) => {
    const userId = getUserId(ctx)

    return ctx.prisma.query.tickets(
      {
        where: {
          owner: { id: userId },
          isValidated: false,
        },
        orderBy: 'createdAt_DESC',
      },
      info,
    )
  },
}
