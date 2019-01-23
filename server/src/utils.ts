import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma'

export interface Context {
  prisma: Prisma
  request: any
}

export function getAuthenticationLink(token: string): string {
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:4000/confirm?token=${token}`
  } else {
    return `https://events.gimb.io/confirm?token=${token}`
  }
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string
    }
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
