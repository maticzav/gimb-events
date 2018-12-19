import { UserStatus } from '../generated/prisma-client'

interface UserParent {
  status: UserStatus
}

export const User = {
  __resolveType(parent: UserParent) {
    switch (parent.status) {
      case 'ADMIN':
        return 'Administrator'
      case 'MODERATOR':
        return 'Moderator'
      case 'CUSTOMER':
        return 'Customer'
    }
  },
}
