// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { Resolvers } from '../generated/graphqlgen'

import { Query } from './Query'
import { Viewer } from './Viewer'
import { Ticket } from './Ticket'
import { Event } from './Event'
import { Mutation } from './Mutation'
import { LoginPayload } from './LoginPayload'
import { Customer } from './Customer'
import { Moderator } from './Moderator'
import { Administrator } from './Administrator'
import { User } from './User'

// export const resolvers: Resolvers = {
export const resolvers = {
  Query,
  Viewer,
  Ticket,
  Event,
  Mutation,
  LoginPayload,
  User,
  Customer,
  Moderator,
  Administrator,
}
