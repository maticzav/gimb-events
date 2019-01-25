import React from 'react'
import { destroyCookie } from 'nookies'

import redirect from '../lib/redirect'

class SignOut extends React.Component {
  static async getInitialProps(ctx) {
    destroyCookie(ctx, 'token')

    await ctx.apolloClient.resetStore()

    redirect(ctx, '/')

    return {}
  }
}

export default SignOut
