import { EventResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Event: EventResolvers.Type = {
  __resolveType: async (parent, ctx) => {
    try {
      const userId = getUserId(ctx)
      const userAdmin = await ctx.prisma.exists.User({
        id: userId,
        isAdministrator: true,
      })
      if (userAdmin) {
        return 'AdminEvent'
      }
      return 'PublicEvent'
    } catch (err) {
      return 'PublicEvent'
    }
  },
}
