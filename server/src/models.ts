import { User, Ticket, Event } from './generated/prisma-client'

export interface Viewer {}

export interface Customer {
  id: string
  email: string
  tickets: Ticket[]
}

export interface Moderator {
  id: string
  email: string
  tickets: Ticket[]
}

export interface Administrator {
  id: string
  email: string
  tickets: Ticket[]
}

export interface LoginPayload {}
