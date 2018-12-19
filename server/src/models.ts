import { User, Ticket } from './generated/prisma-client'

export interface Viewer {
  user: User
  tickets: Ticket[]
}

export interface LoginPayload {
  success: boolean
}
