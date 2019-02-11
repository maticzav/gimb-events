import { extractFragmentReplacements } from 'prisma-binding'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Ticket } from './Ticket'
import { Event } from './Event'
import { PublicEvent } from './PublicEvent'
import { AdminEvent } from './AdminEvent'
import { User } from './User'
import { LoginPayload } from './LoginPayload'

export const resolvers = {
  Query,
  Mutation,
  Ticket,
  Event,
  PublicEvent,
  AdminEvent,
  User,
  LoginPayload,
}

export const fragmentReplacements = extractFragmentReplacements(
  resolvers as any,
)
