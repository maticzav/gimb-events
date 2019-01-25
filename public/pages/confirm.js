import React from 'react'
import { setCookie } from 'nookies'

import redirect from '../lib/redirect'

class Confirm extends React.Component {
  static async getInitialProps(ctx) {
    if (ctx.query.token) {
      setCookie(ctx, 'token', ctx.query.token)

      await ctx.apolloClient.resetStore()

      redirect(ctx, '/')
    }

    return {}
  }
}

export default Confirm
