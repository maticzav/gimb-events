import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
  events: <T = Array<Event | null>>(
    args: {
      where?: EventWhereInput | null
      orderBy?: EventOrderByInput | null
      skip?: Int | null
      after?: String | null
      before?: String | null
      first?: Int | null
      last?: Int | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  tickets: <T = Array<Ticket | null>>(
    args: {
      where?: TicketWhereInput | null
      orderBy?: TicketOrderByInput | null
      skip?: Int | null
      after?: String | null
      before?: String | null
      first?: Int | null
      last?: Int | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  users: <T = Array<User | null>>(
    args: {
      where?: UserWhereInput | null
      orderBy?: UserOrderByInput | null
      skip?: Int | null
      after?: String | null
      before?: String | null
      first?: Int | null
      last?: Int | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  event: <T = Event | null>(
    args: { where: EventWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  ticket: <T = Ticket | null>(
    args: { where: TicketWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  user: <T = User | null>(
    args: { where: UserWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  eventsConnection: <T = EventConnection>(
    args: {
      where?: EventWhereInput | null
      orderBy?: EventOrderByInput | null
      skip?: Int | null
      after?: String | null
      before?: String | null
      first?: Int | null
      last?: Int | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  ticketsConnection: <T = TicketConnection>(
    args: {
      where?: TicketWhereInput | null
      orderBy?: TicketOrderByInput | null
      skip?: Int | null
      after?: String | null
      before?: String | null
      first?: Int | null
      last?: Int | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  usersConnection: <T = UserConnection>(
    args: {
      where?: UserWhereInput | null
      orderBy?: UserOrderByInput | null
      skip?: Int | null
      after?: String | null
      before?: String | null
      first?: Int | null
      last?: Int | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  node: <T = Node | null>(
    args: { id: ID_Output },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
}

export interface Mutation {
  createEvent: <T = Event>(
    args: { data: EventCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  createTicket: <T = Ticket>(
    args: { data: TicketCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  createUser: <T = User>(
    args: { data: UserCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  updateEvent: <T = Event | null>(
    args: { data: EventUpdateInput; where: EventWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  updateTicket: <T = Ticket | null>(
    args: { data: TicketUpdateInput; where: TicketWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  updateUser: <T = User | null>(
    args: { data: UserUpdateInput; where: UserWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  deleteEvent: <T = Event | null>(
    args: { where: EventWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  deleteTicket: <T = Ticket | null>(
    args: { where: TicketWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  deleteUser: <T = User | null>(
    args: { where: UserWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>
  upsertEvent: <T = Event>(
    args: {
      where: EventWhereUniqueInput
      create: EventCreateInput
      update: EventUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  upsertTicket: <T = Ticket>(
    args: {
      where: TicketWhereUniqueInput
      create: TicketCreateInput
      update: TicketUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  upsertUser: <T = User>(
    args: {
      where: UserWhereUniqueInput
      create: UserCreateInput
      update: UserUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  updateManyEvents: <T = BatchPayload>(
    args: {
      data: EventUpdateManyMutationInput
      where?: EventWhereInput | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  updateManyTickets: <T = BatchPayload>(
    args: {
      data: TicketUpdateManyMutationInput
      where?: TicketWhereInput | null
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  updateManyUsers: <T = BatchPayload>(
    args: { data: UserUpdateManyMutationInput; where?: UserWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  deleteManyEvents: <T = BatchPayload>(
    args: { where?: EventWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  deleteManyTickets: <T = BatchPayload>(
    args: { where?: TicketWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
  deleteManyUsers: <T = BatchPayload>(
    args: { where?: UserWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>
}

export interface Subscription {
  event: <T = EventSubscriptionPayload | null>(
    args: { where?: EventSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>
  ticket: <T = TicketSubscriptionPayload | null>(
    args: { where?: TicketSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>
  user: <T = UserSubscriptionPayload | null>(
    args: { where?: UserSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>
}

export interface Exists {
  Event: (where?: EventWhereInput) => Promise<boolean>
  Ticket: (where?: TicketWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(
    query: string,
    variables?: { [key: string]: any },
  ) => Promise<T>
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<any>
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<AsyncIterator<any>>
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers
}

export interface BindingConstructor<T> {
  new (options: BasePrismaOptions): T
}
/**
 * Type Defs
 */

const typeDefs = `type AggregateEvent {
  count: Int!
}

type AggregateTicket {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

scalar DateTime

type Event implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  speaker: String!
  description: String!
  location: String!
  period: Int!
  date: DateTime!
  published: Boolean!
  numberOfTickets: Int!
  tickets(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket!]
}

"""A connection to a list of items."""
type EventConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  name: String!
  speaker: String!
  description: String!
  location: String!
  period: Int!
  date: DateTime!
  published: Boolean
  numberOfTickets: Int!
  tickets: TicketCreateManyWithoutEventInput
}

input EventCreateOneWithoutTicketsInput {
  create: EventCreateWithoutTicketsInput
  connect: EventWhereUniqueInput
}

input EventCreateWithoutTicketsInput {
  name: String!
  speaker: String!
  description: String!
  location: String!
  period: Int!
  date: DateTime!
  published: Boolean
  numberOfTickets: Int!
}

"""An edge in a connection."""
type EventEdge {
  """The item at the end of the edge."""
  node: Event!

  """A cursor for use in pagination."""
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  speaker_ASC
  speaker_DESC
  description_ASC
  description_DESC
  location_ASC
  location_DESC
  period_ASC
  period_DESC
  date_ASC
  date_DESC
  published_ASC
  published_DESC
  numberOfTickets_ASC
  numberOfTickets_DESC
}

type EventPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  speaker: String!
  description: String!
  location: String!
  period: Int!
  date: DateTime!
  published: Boolean!
  numberOfTickets: Int!
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [EventSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [EventSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [EventSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: EventWhereInput
}

input EventUpdateInput {
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published: Boolean
  numberOfTickets: Int
  tickets: TicketUpdateManyWithoutEventInput
}

input EventUpdateManyMutationInput {
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published: Boolean
  numberOfTickets: Int
}

input EventUpdateOneRequiredWithoutTicketsInput {
  create: EventCreateWithoutTicketsInput
  connect: EventWhereUniqueInput
  update: EventUpdateWithoutTicketsDataInput
  upsert: EventUpsertWithoutTicketsInput
}

input EventUpdateWithoutTicketsDataInput {
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published: Boolean
  numberOfTickets: Int
}

input EventUpsertWithoutTicketsInput {
  update: EventUpdateWithoutTicketsDataInput!
  create: EventCreateWithoutTicketsInput!
}

input EventWhereInput {
  """Logical AND on all given filters."""
  AND: [EventWhereInput!]

  """Logical OR on all given filters."""
  OR: [EventWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [EventWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  speaker: String

  """All values that are not equal to given value."""
  speaker_not: String

  """All values that are contained in given list."""
  speaker_in: [String!]

  """All values that are not contained in given list."""
  speaker_not_in: [String!]

  """All values less than the given value."""
  speaker_lt: String

  """All values less than or equal the given value."""
  speaker_lte: String

  """All values greater than the given value."""
  speaker_gt: String

  """All values greater than or equal the given value."""
  speaker_gte: String

  """All values containing the given string."""
  speaker_contains: String

  """All values not containing the given string."""
  speaker_not_contains: String

  """All values starting with the given string."""
  speaker_starts_with: String

  """All values not starting with the given string."""
  speaker_not_starts_with: String

  """All values ending with the given string."""
  speaker_ends_with: String

  """All values not ending with the given string."""
  speaker_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  location: String

  """All values that are not equal to given value."""
  location_not: String

  """All values that are contained in given list."""
  location_in: [String!]

  """All values that are not contained in given list."""
  location_not_in: [String!]

  """All values less than the given value."""
  location_lt: String

  """All values less than or equal the given value."""
  location_lte: String

  """All values greater than the given value."""
  location_gt: String

  """All values greater than or equal the given value."""
  location_gte: String

  """All values containing the given string."""
  location_contains: String

  """All values not containing the given string."""
  location_not_contains: String

  """All values starting with the given string."""
  location_starts_with: String

  """All values not starting with the given string."""
  location_not_starts_with: String

  """All values ending with the given string."""
  location_ends_with: String

  """All values not ending with the given string."""
  location_not_ends_with: String
  period: Int

  """All values that are not equal to given value."""
  period_not: Int

  """All values that are contained in given list."""
  period_in: [Int!]

  """All values that are not contained in given list."""
  period_not_in: [Int!]

  """All values less than the given value."""
  period_lt: Int

  """All values less than or equal the given value."""
  period_lte: Int

  """All values greater than the given value."""
  period_gt: Int

  """All values greater than or equal the given value."""
  period_gte: Int
  date: DateTime

  """All values that are not equal to given value."""
  date_not: DateTime

  """All values that are contained in given list."""
  date_in: [DateTime!]

  """All values that are not contained in given list."""
  date_not_in: [DateTime!]

  """All values less than the given value."""
  date_lt: DateTime

  """All values less than or equal the given value."""
  date_lte: DateTime

  """All values greater than the given value."""
  date_gt: DateTime

  """All values greater than or equal the given value."""
  date_gte: DateTime
  published: Boolean

  """All values that are not equal to given value."""
  published_not: Boolean
  numberOfTickets: Int

  """All values that are not equal to given value."""
  numberOfTickets_not: Int

  """All values that are contained in given list."""
  numberOfTickets_in: [Int!]

  """All values that are not contained in given list."""
  numberOfTickets_not_in: [Int!]

  """All values less than the given value."""
  numberOfTickets_lt: Int

  """All values less than or equal the given value."""
  numberOfTickets_lte: Int

  """All values greater than the given value."""
  numberOfTickets_gt: Int

  """All values greater than or equal the given value."""
  numberOfTickets_gte: Int
  tickets_every: TicketWhereInput
  tickets_some: TicketWhereInput
  tickets_none: TicketWhereInput
}

input EventWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createEvent(data: EventCreateInput!): Event!
  createTicket(data: TicketCreateInput!): Ticket!
  createUser(data: UserCreateInput!): User!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateTicket(data: TicketUpdateInput!, where: TicketWhereUniqueInput!): Ticket
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteTicket(where: TicketWhereUniqueInput!): Ticket
  deleteUser(where: UserWhereUniqueInput!): User
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  upsertTicket(where: TicketWhereUniqueInput!, create: TicketCreateInput!, update: TicketUpdateInput!): Ticket!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  updateManyTickets(data: TicketUpdateManyMutationInput!, where: TicketWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  deleteManyTickets(where: TicketWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  tickets(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  event(where: EventWhereUniqueInput!): Event
  ticket(where: TicketWhereUniqueInput!): Ticket
  user(where: UserWhereUniqueInput!): User
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  ticketsConnection(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TicketConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  ticket(where: TicketSubscriptionWhereInput): TicketSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Ticket implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  event: Event!
  owner: User!
  isValidated: Boolean!
}

"""A connection to a list of items."""
type TicketConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TicketEdge]!
  aggregate: AggregateTicket!
}

input TicketCreateInput {
  isValidated: Boolean
  event: EventCreateOneWithoutTicketsInput!
  owner: UserCreateOneWithoutTicketsInput!
}

input TicketCreateManyWithoutEventInput {
  create: [TicketCreateWithoutEventInput!]
  connect: [TicketWhereUniqueInput!]
}

input TicketCreateManyWithoutOwnerInput {
  create: [TicketCreateWithoutOwnerInput!]
  connect: [TicketWhereUniqueInput!]
}

input TicketCreateWithoutEventInput {
  isValidated: Boolean
  owner: UserCreateOneWithoutTicketsInput!
}

input TicketCreateWithoutOwnerInput {
  isValidated: Boolean
  event: EventCreateOneWithoutTicketsInput!
}

"""An edge in a connection."""
type TicketEdge {
  """The item at the end of the edge."""
  node: Ticket!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TicketOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  isValidated_ASC
  isValidated_DESC
}

type TicketPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  isValidated: Boolean!
}

input TicketScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [TicketScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [TicketScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TicketScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  isValidated: Boolean

  """All values that are not equal to given value."""
  isValidated_not: Boolean
}

type TicketSubscriptionPayload {
  mutation: MutationType!
  node: Ticket
  updatedFields: [String!]
  previousValues: TicketPreviousValues
}

input TicketSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TicketSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TicketSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TicketSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TicketWhereInput
}

input TicketUpdateInput {
  isValidated: Boolean
  event: EventUpdateOneRequiredWithoutTicketsInput
  owner: UserUpdateOneRequiredWithoutTicketsInput
}

input TicketUpdateManyDataInput {
  isValidated: Boolean
}

input TicketUpdateManyMutationInput {
  isValidated: Boolean
}

input TicketUpdateManyWithoutEventInput {
  create: [TicketCreateWithoutEventInput!]
  connect: [TicketWhereUniqueInput!]
  set: [TicketWhereUniqueInput!]
  disconnect: [TicketWhereUniqueInput!]
  delete: [TicketWhereUniqueInput!]
  update: [TicketUpdateWithWhereUniqueWithoutEventInput!]
  updateMany: [TicketUpdateManyWithWhereNestedInput!]
  deleteMany: [TicketScalarWhereInput!]
  upsert: [TicketUpsertWithWhereUniqueWithoutEventInput!]
}

input TicketUpdateManyWithoutOwnerInput {
  create: [TicketCreateWithoutOwnerInput!]
  connect: [TicketWhereUniqueInput!]
  set: [TicketWhereUniqueInput!]
  disconnect: [TicketWhereUniqueInput!]
  delete: [TicketWhereUniqueInput!]
  update: [TicketUpdateWithWhereUniqueWithoutOwnerInput!]
  updateMany: [TicketUpdateManyWithWhereNestedInput!]
  deleteMany: [TicketScalarWhereInput!]
  upsert: [TicketUpsertWithWhereUniqueWithoutOwnerInput!]
}

input TicketUpdateManyWithWhereNestedInput {
  where: TicketScalarWhereInput!
  data: TicketUpdateManyDataInput!
}

input TicketUpdateWithoutEventDataInput {
  isValidated: Boolean
  owner: UserUpdateOneRequiredWithoutTicketsInput
}

input TicketUpdateWithoutOwnerDataInput {
  isValidated: Boolean
  event: EventUpdateOneRequiredWithoutTicketsInput
}

input TicketUpdateWithWhereUniqueWithoutEventInput {
  where: TicketWhereUniqueInput!
  data: TicketUpdateWithoutEventDataInput!
}

input TicketUpdateWithWhereUniqueWithoutOwnerInput {
  where: TicketWhereUniqueInput!
  data: TicketUpdateWithoutOwnerDataInput!
}

input TicketUpsertWithWhereUniqueWithoutEventInput {
  where: TicketWhereUniqueInput!
  update: TicketUpdateWithoutEventDataInput!
  create: TicketCreateWithoutEventInput!
}

input TicketUpsertWithWhereUniqueWithoutOwnerInput {
  where: TicketWhereUniqueInput!
  update: TicketUpdateWithoutOwnerDataInput!
  create: TicketCreateWithoutOwnerInput!
}

input TicketWhereInput {
  """Logical AND on all given filters."""
  AND: [TicketWhereInput!]

  """Logical OR on all given filters."""
  OR: [TicketWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TicketWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  isValidated: Boolean

  """All values that are not equal to given value."""
  isValidated_not: Boolean
  event: EventWhereInput
  owner: UserWhereInput
}

input TicketWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  tickets(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket!]
  isModerator: Boolean!
  isAdministrator: Boolean!
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  isModerator: Boolean
  isAdministrator: Boolean
  tickets: TicketCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutTicketsInput {
  create: UserCreateWithoutTicketsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTicketsInput {
  email: String!
  isModerator: Boolean
  isAdministrator: Boolean
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  email_ASC
  email_DESC
  isModerator_ASC
  isModerator_DESC
  isAdministrator_ASC
  isAdministrator_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  isModerator: Boolean!
  isAdministrator: Boolean!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  isModerator: Boolean
  isAdministrator: Boolean
  tickets: TicketUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  email: String
  isModerator: Boolean
  isAdministrator: Boolean
}

input UserUpdateOneRequiredWithoutTicketsInput {
  create: UserCreateWithoutTicketsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutTicketsDataInput
  upsert: UserUpsertWithoutTicketsInput
}

input UserUpdateWithoutTicketsDataInput {
  email: String
  isModerator: Boolean
  isAdministrator: Boolean
}

input UserUpsertWithoutTicketsInput {
  update: UserUpdateWithoutTicketsDataInput!
  create: UserCreateWithoutTicketsInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  isModerator: Boolean

  """All values that are not equal to given value."""
  isModerator_not: Boolean
  isAdministrator: Boolean

  """All values that are not equal to given value."""
  isAdministrator_not: Boolean
  tickets_every: TicketWhereInput
  tickets_some: TicketWhereInput
  tickets_none: TicketWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({
  typeDefs,
})

/**
 * Types
 */

export type EventOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'speaker_ASC'
  | 'speaker_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'location_ASC'
  | 'location_DESC'
  | 'period_ASC'
  | 'period_DESC'
  | 'date_ASC'
  | 'date_DESC'
  | 'published_ASC'
  | 'published_DESC'
  | 'numberOfTickets_ASC'
  | 'numberOfTickets_DESC'

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED'

export type TicketOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'isValidated_ASC'
  | 'isValidated_DESC'

export type UserOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'isModerator_ASC'
  | 'isModerator_DESC'
  | 'isAdministrator_ASC'
  | 'isAdministrator_DESC'

export interface EventCreateInput {
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published?: Boolean | null
  numberOfTickets: Int
  tickets?: TicketCreateManyWithoutEventInput | null
}

export interface EventCreateOneWithoutTicketsInput {
  create?: EventCreateWithoutTicketsInput | null
  connect?: EventWhereUniqueInput | null
}

export interface EventCreateWithoutTicketsInput {
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published?: Boolean | null
  numberOfTickets: Int
}

export interface EventSubscriptionWhereInput {
  AND?: EventSubscriptionWhereInput[] | EventSubscriptionWhereInput | null
  OR?: EventSubscriptionWhereInput[] | EventSubscriptionWhereInput | null
  NOT?: EventSubscriptionWhereInput[] | EventSubscriptionWhereInput | null
  mutation_in?: MutationType[] | MutationType | null
  updatedFields_contains?: String | null
  updatedFields_contains_every?: String[] | String | null
  updatedFields_contains_some?: String[] | String | null
  node?: EventWhereInput | null
}

export interface EventUpdateInput {
  name?: String | null
  speaker?: String | null
  description?: String | null
  location?: String | null
  period?: Int | null
  date?: DateTime | null
  published?: Boolean | null
  numberOfTickets?: Int | null
  tickets?: TicketUpdateManyWithoutEventInput | null
}

export interface EventUpdateManyMutationInput {
  name?: String | null
  speaker?: String | null
  description?: String | null
  location?: String | null
  period?: Int | null
  date?: DateTime | null
  published?: Boolean | null
  numberOfTickets?: Int | null
}

export interface EventUpdateOneRequiredWithoutTicketsInput {
  create?: EventCreateWithoutTicketsInput | null
  connect?: EventWhereUniqueInput | null
  update?: EventUpdateWithoutTicketsDataInput | null
  upsert?: EventUpsertWithoutTicketsInput | null
}

export interface EventUpdateWithoutTicketsDataInput {
  name?: String | null
  speaker?: String | null
  description?: String | null
  location?: String | null
  period?: Int | null
  date?: DateTime | null
  published?: Boolean | null
  numberOfTickets?: Int | null
}

export interface EventUpsertWithoutTicketsInput {
  update: EventUpdateWithoutTicketsDataInput
  create: EventCreateWithoutTicketsInput
}

export interface EventWhereInput {
  AND?: EventWhereInput[] | EventWhereInput | null
  OR?: EventWhereInput[] | EventWhereInput | null
  NOT?: EventWhereInput[] | EventWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  createdAt?: DateTime | null
  createdAt_not?: DateTime | null
  createdAt_in?: DateTime[] | DateTime | null
  createdAt_not_in?: DateTime[] | DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  updatedAt?: DateTime | null
  updatedAt_not?: DateTime | null
  updatedAt_in?: DateTime[] | DateTime | null
  updatedAt_not_in?: DateTime[] | DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  name?: String | null
  name_not?: String | null
  name_in?: String[] | String | null
  name_not_in?: String[] | String | null
  name_lt?: String | null
  name_lte?: String | null
  name_gt?: String | null
  name_gte?: String | null
  name_contains?: String | null
  name_not_contains?: String | null
  name_starts_with?: String | null
  name_not_starts_with?: String | null
  name_ends_with?: String | null
  name_not_ends_with?: String | null
  speaker?: String | null
  speaker_not?: String | null
  speaker_in?: String[] | String | null
  speaker_not_in?: String[] | String | null
  speaker_lt?: String | null
  speaker_lte?: String | null
  speaker_gt?: String | null
  speaker_gte?: String | null
  speaker_contains?: String | null
  speaker_not_contains?: String | null
  speaker_starts_with?: String | null
  speaker_not_starts_with?: String | null
  speaker_ends_with?: String | null
  speaker_not_ends_with?: String | null
  description?: String | null
  description_not?: String | null
  description_in?: String[] | String | null
  description_not_in?: String[] | String | null
  description_lt?: String | null
  description_lte?: String | null
  description_gt?: String | null
  description_gte?: String | null
  description_contains?: String | null
  description_not_contains?: String | null
  description_starts_with?: String | null
  description_not_starts_with?: String | null
  description_ends_with?: String | null
  description_not_ends_with?: String | null
  location?: String | null
  location_not?: String | null
  location_in?: String[] | String | null
  location_not_in?: String[] | String | null
  location_lt?: String | null
  location_lte?: String | null
  location_gt?: String | null
  location_gte?: String | null
  location_contains?: String | null
  location_not_contains?: String | null
  location_starts_with?: String | null
  location_not_starts_with?: String | null
  location_ends_with?: String | null
  location_not_ends_with?: String | null
  period?: Int | null
  period_not?: Int | null
  period_in?: Int[] | Int | null
  period_not_in?: Int[] | Int | null
  period_lt?: Int | null
  period_lte?: Int | null
  period_gt?: Int | null
  period_gte?: Int | null
  date?: DateTime | null
  date_not?: DateTime | null
  date_in?: DateTime[] | DateTime | null
  date_not_in?: DateTime[] | DateTime | null
  date_lt?: DateTime | null
  date_lte?: DateTime | null
  date_gt?: DateTime | null
  date_gte?: DateTime | null
  published?: Boolean | null
  published_not?: Boolean | null
  numberOfTickets?: Int | null
  numberOfTickets_not?: Int | null
  numberOfTickets_in?: Int[] | Int | null
  numberOfTickets_not_in?: Int[] | Int | null
  numberOfTickets_lt?: Int | null
  numberOfTickets_lte?: Int | null
  numberOfTickets_gt?: Int | null
  numberOfTickets_gte?: Int | null
  tickets_every?: TicketWhereInput | null
  tickets_some?: TicketWhereInput | null
  tickets_none?: TicketWhereInput | null
}

export interface EventWhereUniqueInput {
  id?: ID_Input | null
}

export interface TicketCreateInput {
  isValidated?: Boolean | null
  event: EventCreateOneWithoutTicketsInput
  owner: UserCreateOneWithoutTicketsInput
}

export interface TicketCreateManyWithoutEventInput {
  create?:
    | TicketCreateWithoutEventInput[]
    | TicketCreateWithoutEventInput
    | null
  connect?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
}

export interface TicketCreateManyWithoutOwnerInput {
  create?:
    | TicketCreateWithoutOwnerInput[]
    | TicketCreateWithoutOwnerInput
    | null
  connect?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
}

export interface TicketCreateWithoutEventInput {
  isValidated?: Boolean | null
  owner: UserCreateOneWithoutTicketsInput
}

export interface TicketCreateWithoutOwnerInput {
  isValidated?: Boolean | null
  event: EventCreateOneWithoutTicketsInput
}

export interface TicketScalarWhereInput {
  AND?: TicketScalarWhereInput[] | TicketScalarWhereInput | null
  OR?: TicketScalarWhereInput[] | TicketScalarWhereInput | null
  NOT?: TicketScalarWhereInput[] | TicketScalarWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  createdAt?: DateTime | null
  createdAt_not?: DateTime | null
  createdAt_in?: DateTime[] | DateTime | null
  createdAt_not_in?: DateTime[] | DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  updatedAt?: DateTime | null
  updatedAt_not?: DateTime | null
  updatedAt_in?: DateTime[] | DateTime | null
  updatedAt_not_in?: DateTime[] | DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  isValidated?: Boolean | null
  isValidated_not?: Boolean | null
}

export interface TicketSubscriptionWhereInput {
  AND?: TicketSubscriptionWhereInput[] | TicketSubscriptionWhereInput | null
  OR?: TicketSubscriptionWhereInput[] | TicketSubscriptionWhereInput | null
  NOT?: TicketSubscriptionWhereInput[] | TicketSubscriptionWhereInput | null
  mutation_in?: MutationType[] | MutationType | null
  updatedFields_contains?: String | null
  updatedFields_contains_every?: String[] | String | null
  updatedFields_contains_some?: String[] | String | null
  node?: TicketWhereInput | null
}

export interface TicketUpdateInput {
  isValidated?: Boolean | null
  event?: EventUpdateOneRequiredWithoutTicketsInput | null
  owner?: UserUpdateOneRequiredWithoutTicketsInput | null
}

export interface TicketUpdateManyDataInput {
  isValidated?: Boolean | null
}

export interface TicketUpdateManyMutationInput {
  isValidated?: Boolean | null
}

export interface TicketUpdateManyWithoutEventInput {
  create?:
    | TicketCreateWithoutEventInput[]
    | TicketCreateWithoutEventInput
    | null
  connect?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  set?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  disconnect?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  delete?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  update?:
    | TicketUpdateWithWhereUniqueWithoutEventInput[]
    | TicketUpdateWithWhereUniqueWithoutEventInput
    | null
  updateMany?:
    | TicketUpdateManyWithWhereNestedInput[]
    | TicketUpdateManyWithWhereNestedInput
    | null
  deleteMany?: TicketScalarWhereInput[] | TicketScalarWhereInput | null
  upsert?:
    | TicketUpsertWithWhereUniqueWithoutEventInput[]
    | TicketUpsertWithWhereUniqueWithoutEventInput
    | null
}

export interface TicketUpdateManyWithoutOwnerInput {
  create?:
    | TicketCreateWithoutOwnerInput[]
    | TicketCreateWithoutOwnerInput
    | null
  connect?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  set?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  disconnect?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  delete?: TicketWhereUniqueInput[] | TicketWhereUniqueInput | null
  update?:
    | TicketUpdateWithWhereUniqueWithoutOwnerInput[]
    | TicketUpdateWithWhereUniqueWithoutOwnerInput
    | null
  updateMany?:
    | TicketUpdateManyWithWhereNestedInput[]
    | TicketUpdateManyWithWhereNestedInput
    | null
  deleteMany?: TicketScalarWhereInput[] | TicketScalarWhereInput | null
  upsert?:
    | TicketUpsertWithWhereUniqueWithoutOwnerInput[]
    | TicketUpsertWithWhereUniqueWithoutOwnerInput
    | null
}

export interface TicketUpdateManyWithWhereNestedInput {
  where: TicketScalarWhereInput
  data: TicketUpdateManyDataInput
}

export interface TicketUpdateWithoutEventDataInput {
  isValidated?: Boolean | null
  owner?: UserUpdateOneRequiredWithoutTicketsInput | null
}

export interface TicketUpdateWithoutOwnerDataInput {
  isValidated?: Boolean | null
  event?: EventUpdateOneRequiredWithoutTicketsInput | null
}

export interface TicketUpdateWithWhereUniqueWithoutEventInput {
  where: TicketWhereUniqueInput
  data: TicketUpdateWithoutEventDataInput
}

export interface TicketUpdateWithWhereUniqueWithoutOwnerInput {
  where: TicketWhereUniqueInput
  data: TicketUpdateWithoutOwnerDataInput
}

export interface TicketUpsertWithWhereUniqueWithoutEventInput {
  where: TicketWhereUniqueInput
  update: TicketUpdateWithoutEventDataInput
  create: TicketCreateWithoutEventInput
}

export interface TicketUpsertWithWhereUniqueWithoutOwnerInput {
  where: TicketWhereUniqueInput
  update: TicketUpdateWithoutOwnerDataInput
  create: TicketCreateWithoutOwnerInput
}

export interface TicketWhereInput {
  AND?: TicketWhereInput[] | TicketWhereInput | null
  OR?: TicketWhereInput[] | TicketWhereInput | null
  NOT?: TicketWhereInput[] | TicketWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  createdAt?: DateTime | null
  createdAt_not?: DateTime | null
  createdAt_in?: DateTime[] | DateTime | null
  createdAt_not_in?: DateTime[] | DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  updatedAt?: DateTime | null
  updatedAt_not?: DateTime | null
  updatedAt_in?: DateTime[] | DateTime | null
  updatedAt_not_in?: DateTime[] | DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  isValidated?: Boolean | null
  isValidated_not?: Boolean | null
  event?: EventWhereInput | null
  owner?: UserWhereInput | null
}

export interface TicketWhereUniqueInput {
  id?: ID_Input | null
}

export interface UserCreateInput {
  email: String
  isModerator?: Boolean | null
  isAdministrator?: Boolean | null
  tickets?: TicketCreateManyWithoutOwnerInput | null
}

export interface UserCreateOneWithoutTicketsInput {
  create?: UserCreateWithoutTicketsInput | null
  connect?: UserWhereUniqueInput | null
}

export interface UserCreateWithoutTicketsInput {
  email: String
  isModerator?: Boolean | null
  isAdministrator?: Boolean | null
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput | null
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput | null
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput | null
  mutation_in?: MutationType[] | MutationType | null
  updatedFields_contains?: String | null
  updatedFields_contains_every?: String[] | String | null
  updatedFields_contains_some?: String[] | String | null
  node?: UserWhereInput | null
}

export interface UserUpdateInput {
  email?: String | null
  isModerator?: Boolean | null
  isAdministrator?: Boolean | null
  tickets?: TicketUpdateManyWithoutOwnerInput | null
}

export interface UserUpdateManyMutationInput {
  email?: String | null
  isModerator?: Boolean | null
  isAdministrator?: Boolean | null
}

export interface UserUpdateOneRequiredWithoutTicketsInput {
  create?: UserCreateWithoutTicketsInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutTicketsDataInput | null
  upsert?: UserUpsertWithoutTicketsInput | null
}

export interface UserUpdateWithoutTicketsDataInput {
  email?: String | null
  isModerator?: Boolean | null
  isAdministrator?: Boolean | null
}

export interface UserUpsertWithoutTicketsInput {
  update: UserUpdateWithoutTicketsDataInput
  create: UserCreateWithoutTicketsInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput | null
  OR?: UserWhereInput[] | UserWhereInput | null
  NOT?: UserWhereInput[] | UserWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  createdAt?: DateTime | null
  createdAt_not?: DateTime | null
  createdAt_in?: DateTime[] | DateTime | null
  createdAt_not_in?: DateTime[] | DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  updatedAt?: DateTime | null
  updatedAt_not?: DateTime | null
  updatedAt_in?: DateTime[] | DateTime | null
  updatedAt_not_in?: DateTime[] | DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  email?: String | null
  email_not?: String | null
  email_in?: String[] | String | null
  email_not_in?: String[] | String | null
  email_lt?: String | null
  email_lte?: String | null
  email_gt?: String | null
  email_gte?: String | null
  email_contains?: String | null
  email_not_contains?: String | null
  email_starts_with?: String | null
  email_not_starts_with?: String | null
  email_ends_with?: String | null
  email_not_ends_with?: String | null
  isModerator?: Boolean | null
  isModerator_not?: Boolean | null
  isAdministrator?: Boolean | null
  isAdministrator_not?: Boolean | null
  tickets_every?: TicketWhereInput | null
  tickets_some?: TicketWhereInput | null
  tickets_none?: TicketWhereInput | null
}

export interface UserWhereUniqueInput {
  id?: ID_Input | null
  email?: String | null
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface AggregateEvent {
  count: Int
}

export interface AggregateTicket {
  count: Int
}

export interface AggregateUser {
  count: Int
}

export interface BatchPayload {
  count: Long
}

export interface Event extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published: Boolean
  numberOfTickets: Int
  tickets?: Array<Ticket> | null
}

/*
 * A connection to a list of items.

 */
export interface EventConnection {
  pageInfo: PageInfo
  edges: Array<EventEdge | null>
  aggregate: AggregateEvent
}

/*
 * An edge in a connection.

 */
export interface EventEdge {
  node: Event
  cursor: String
}

export interface EventPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  speaker: String
  description: String
  location: String
  period: Int
  date: DateTime
  published: Boolean
  numberOfTickets: Int
}

export interface EventSubscriptionPayload {
  mutation: MutationType
  node?: Event | null
  updatedFields?: Array<String> | null
  previousValues?: EventPreviousValues | null
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

export interface Ticket extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  event: Event
  owner: User
  isValidated: Boolean
}

/*
 * A connection to a list of items.

 */
export interface TicketConnection {
  pageInfo: PageInfo
  edges: Array<TicketEdge | null>
  aggregate: AggregateTicket
}

/*
 * An edge in a connection.

 */
export interface TicketEdge {
  node: Ticket
  cursor: String
}

export interface TicketPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  isValidated: Boolean
}

export interface TicketSubscriptionPayload {
  mutation: MutationType
  node?: Ticket | null
  updatedFields?: Array<String> | null
  previousValues?: TicketPreviousValues | null
}

export interface User extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  email: String
  tickets?: Array<Ticket> | null
  isModerator: Boolean
  isAdministrator: Boolean
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: Array<UserEdge | null>
  aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  email: String
  isModerator: Boolean
  isAdministrator: Boolean
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User | null
  updatedFields?: Array<String> | null
  previousValues?: UserPreviousValues | null
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export type DateTime = Date | string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string
