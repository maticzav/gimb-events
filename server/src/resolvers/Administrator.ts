// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { AdministratorResolvers } from '../generated/graphqlgen'

export const Administrator: AdministratorResolvers.Type = {
  ...AdministratorResolvers.defaultResolvers,

  events: (parent, args, ctx) => {
    return ctx.prisma.events()
  },
}
