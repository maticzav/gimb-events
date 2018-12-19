// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { ViewerResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Viewer: ViewerResolvers.Type = {
  ...ViewerResolvers.defaultResolvers,

  user: (parent, args, ctx) => {
    const userId = getUserId(ctx)
    return ctx.prisma.user({ id: userId })
  },
}
