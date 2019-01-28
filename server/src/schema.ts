import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Query {
    # Session
    viewer: User
    ticket(id: ID!): Ticket
    # Feed
    feed: [Event!]!
    event(id: ID!): Event
    # Administration
    users(query: String): [User!]!
    events(query: String): [AdminEvent!]!
  }

  type Mutation {
    # Authentication
    login(email: String!): LoginPayload!
    # Ticketing
    requestTicket(eventId: ID!): Ticket
    validateTicket(id: ID!): Ticket
    # Moderation
    createEvent(data: CreateEventInput!): Event
    updateEvent(id: ID!, data: UpdateEventInput): Event
    deleteEvent(id: ID!): Event
    # Administration
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
    event: Event!
    owner: User!
    isValidated: Boolean!
    isExpired: Boolean!
  }

  type Event {
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

  type AdminEvent {
    id: ID!

    # Meta
    name: String!
    speaker: String!
    description: String!
    location: String!
    period: Int!
    date: DateTime!

    # Admin
    numberOfTickets: Int!
    numberOfReservations: Int!
    isPublished: Boolean!
  }
`