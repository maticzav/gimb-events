import { extractFragmentReplacements } from 'prisma-binding'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Ticket } from './Ticket'
import { PublicEvent } from './PublicEvent'
import { AdminEvent } from './AdminEvent'

export const resolvers = {
  Query,
  Mutation,
  Ticket,
  PublicEvent,
  AdminEvent,
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
