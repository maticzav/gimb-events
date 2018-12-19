export const typeDefs = /* GraphQL */ `type AggregateEvent {
  count: Int!
}

type AggregateTicket {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Event {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  description: String!
  location: String!
  period: Int!
  date: DateTime!
  published: Boolean!
  numberOfTickets: Int!
  tickets(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket!]
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  name: String!
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
  description: String!
  location: String!
  period: Int!
  date: DateTime!
  published: Boolean
  numberOfTickets: Int!
}

type EventEdge {
  node: Event!
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
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateInput {
  name: String
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
  description: String
  location: String
  period: Int
  date: DateTime
  published: Boolean
  numberOfTickets: Int
}

input EventUpdateOneRequiredWithoutTicketsInput {
  create: EventCreateWithoutTicketsInput
  update: EventUpdateWithoutTicketsDataInput
  upsert: EventUpsertWithoutTicketsInput
  connect: EventWhereUniqueInput
}

input EventUpdateWithoutTicketsDataInput {
  name: String
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  period: Int
  period_not: Int
  period_in: [Int!]
  period_not_in: [Int!]
  period_lt: Int
  period_lte: Int
  period_gt: Int
  period_gte: Int
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  published: Boolean
  published_not: Boolean
  numberOfTickets: Int
  numberOfTickets_not: Int
  numberOfTickets_in: [Int!]
  numberOfTickets_not_in: [Int!]
  numberOfTickets_lt: Int
  numberOfTickets_lte: Int
  numberOfTickets_gt: Int
  numberOfTickets_gte: Int
  tickets_every: TicketWhereInput
  tickets_some: TicketWhereInput
  tickets_none: TicketWhereInput
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createTicket(data: TicketCreateInput!): Ticket!
  updateTicket(data: TicketUpdateInput!, where: TicketWhereUniqueInput!): Ticket
  updateManyTickets(data: TicketUpdateManyMutationInput!, where: TicketWhereInput): BatchPayload!
  upsertTicket(where: TicketWhereUniqueInput!, create: TicketCreateInput!, update: TicketUpdateInput!): Ticket!
  deleteTicket(where: TicketWhereUniqueInput!): Ticket
  deleteManyTickets(where: TicketWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  ticket(where: TicketWhereUniqueInput!): Ticket
  tickets(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket]!
  ticketsConnection(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TicketConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  ticket(where: TicketSubscriptionWhereInput): TicketSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Ticket {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  event: Event!
  owner: User!
  isValidated: Boolean!
}

type TicketConnection {
  pageInfo: PageInfo!
  edges: [TicketEdge]!
  aggregate: AggregateTicket!
}

input TicketCreateInput {
  event: EventCreateOneWithoutTicketsInput!
  owner: UserCreateOneWithoutTicketsInput!
  isValidated: Boolean
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
  owner: UserCreateOneWithoutTicketsInput!
  isValidated: Boolean
}

input TicketCreateWithoutOwnerInput {
  event: EventCreateOneWithoutTicketsInput!
  isValidated: Boolean
}

type TicketEdge {
  node: Ticket!
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  isValidated: Boolean
  isValidated_not: Boolean
  AND: [TicketScalarWhereInput!]
  OR: [TicketScalarWhereInput!]
  NOT: [TicketScalarWhereInput!]
}

type TicketSubscriptionPayload {
  mutation: MutationType!
  node: Ticket
  updatedFields: [String!]
  previousValues: TicketPreviousValues
}

input TicketSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TicketWhereInput
  AND: [TicketSubscriptionWhereInput!]
  OR: [TicketSubscriptionWhereInput!]
  NOT: [TicketSubscriptionWhereInput!]
}

input TicketUpdateInput {
  event: EventUpdateOneRequiredWithoutTicketsInput
  owner: UserUpdateOneRequiredWithoutTicketsInput
  isValidated: Boolean
}

input TicketUpdateManyDataInput {
  isValidated: Boolean
}

input TicketUpdateManyMutationInput {
  isValidated: Boolean
}

input TicketUpdateManyWithoutEventInput {
  create: [TicketCreateWithoutEventInput!]
  delete: [TicketWhereUniqueInput!]
  connect: [TicketWhereUniqueInput!]
  disconnect: [TicketWhereUniqueInput!]
  update: [TicketUpdateWithWhereUniqueWithoutEventInput!]
  upsert: [TicketUpsertWithWhereUniqueWithoutEventInput!]
  deleteMany: [TicketScalarWhereInput!]
  updateMany: [TicketUpdateManyWithWhereNestedInput!]
}

input TicketUpdateManyWithoutOwnerInput {
  create: [TicketCreateWithoutOwnerInput!]
  delete: [TicketWhereUniqueInput!]
  connect: [TicketWhereUniqueInput!]
  disconnect: [TicketWhereUniqueInput!]
  update: [TicketUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [TicketUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [TicketScalarWhereInput!]
  updateMany: [TicketUpdateManyWithWhereNestedInput!]
}

input TicketUpdateManyWithWhereNestedInput {
  where: TicketScalarWhereInput!
  data: TicketUpdateManyDataInput!
}

input TicketUpdateWithoutEventDataInput {
  owner: UserUpdateOneRequiredWithoutTicketsInput
  isValidated: Boolean
}

input TicketUpdateWithoutOwnerDataInput {
  event: EventUpdateOneRequiredWithoutTicketsInput
  isValidated: Boolean
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  event: EventWhereInput
  owner: UserWhereInput
  isValidated: Boolean
  isValidated_not: Boolean
  AND: [TicketWhereInput!]
  OR: [TicketWhereInput!]
  NOT: [TicketWhereInput!]
}

input TicketWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: UserStatus!
  email: String!
  tickets(where: TicketWhereInput, orderBy: TicketOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  status: UserStatus!
  email: String!
  tickets: TicketCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutTicketsInput {
  create: UserCreateWithoutTicketsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTicketsInput {
  status: UserStatus!
  email: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  status_ASC
  status_DESC
  email_ASC
  email_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: UserStatus!
  email: String!
}

enum UserStatus {
  ADMIN
  MODERATOR
  CUSTOMER
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  status: UserStatus
  email: String
  tickets: TicketUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  status: UserStatus
  email: String
}

input UserUpdateOneRequiredWithoutTicketsInput {
  create: UserCreateWithoutTicketsInput
  update: UserUpdateWithoutTicketsDataInput
  upsert: UserUpsertWithoutTicketsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTicketsDataInput {
  status: UserStatus
  email: String
}

input UserUpsertWithoutTicketsInput {
  update: UserUpdateWithoutTicketsDataInput!
  create: UserCreateWithoutTicketsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  status: UserStatus
  status_not: UserStatus
  status_in: [UserStatus!]
  status_not_in: [UserStatus!]
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  tickets_every: TicketWhereInput
  tickets_some: TicketWhereInput
  tickets_none: TicketWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
