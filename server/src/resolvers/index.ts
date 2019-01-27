import { extractFragmentReplacements } from 'prisma-binding'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Ticket } from './Ticket'
import { Event } from './Event'
import { AdminEvent } from './AdminEvent'

export const resolvers = {
  Query,
  Mutation,
  Ticket,
  Event,
  AdminEvent,
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
