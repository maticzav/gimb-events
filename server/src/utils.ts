import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma'

export interface Context {
  prisma: Prisma
  request: express.Request
}

export function getAuthenticationLink(
  token: string,
): { web: string; app: string } {
  if (process.env.NODE_ENV !== 'production') {
    return { web: `http://localhost:3001/confirm?token=${token}`, app: '' }
  } else {
    return {
      web: `https://dogodki.gimb.xyz/confirm?token=${token}`,
      app: '',
    }
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
