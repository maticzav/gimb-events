import { extractFragmentReplacements } from 'prisma-binding'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Ticket } from './Ticket'
import { Event } from './Event'

export const resolvers = {
  Query,
  Mutation,
  Ticket,
  Event,
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
