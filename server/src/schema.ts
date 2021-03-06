import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Query {
    # Session
    viewer: User
    ticket(id: ID!): Ticket
    # Feed
    feed: [PublicEvent!]!
    # Administration
    users(query: String): [User!]
    event(id: ID!): AdminEvent
    events(query: String): [AdminEvent!]
  }

  type Mutation {
    # Authentication
    login(email: String!): LoginPayload!
    # Ticketing
    requestTicket(eventId: ID!): Ticket
    # Moderation
    validateTicket(id: ID!): Ticket
    # Administration
    createEvent(data: CreateEventInput!): AdminEvent
    updateEvent(id: ID!, data: UpdateEventInput!): AdminEvent
    deleteEvent(id: ID!): AdminEvent
    updateUser(id: ID!, data: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }

  # Payloads

  type LoginPayload {
    success: Boolean!
  }

  # Inputs

  input CreateEventInput {
    name: String!
    speaker: String!
    description: String!
    location: String!
    period: Int!
    date: DateTime!
    numberOfTickets: Int!
  }

  input UpdateEventInput {
    name: String
    speaker: String
    description: String
    location: String
    period: Int
    date: DateTime
    numberOfTickets: Int
    published: Boolean
  }

  input UpdateUserInput {
    isModerator: Boolean
    isAdministrator: Boolean
  }

  # Types

  type User {
    id: ID!

    # Meta
    email: String!
    tickets: [Ticket!]!

    # Administration
    isModerator: Boolean
    isAdministrator: Boolean
  }

  type Ticket {
    id: ID!
    event: PublicEvent!
    owner: User!
    isValidated: Boolean!
    isExpired: Boolean!
  }

  interface Event {
    id: ID!
    name: String!
    speaker: String!
    description: String!
    location: String!
    period: Int!
    date: DateTime!
  }

  type PublicEvent implements Event {
    id: ID!

    # Meta
    name: String!
    speaker: String!
    description: String!
    location: String!
    period: Int!
    date: DateTime!

    # Viewer
    viewerHasTicket: Boolean!
    viewerCanRequestTicket: Boolean!
    hasAvailableTickets: Boolean!
  }

  type AdminEvent implements Event {
    id: ID!

    # Meta
    name: String!
    speaker: String!
    description: String!
    location: String!
    period: Int!
    date: DateTime!
    published: Boolean!

    # Admin
    numberOfTickets: Int!
    numberOfReservations: Int!
    numberOfValidatedTickets: Int!
  }
`
