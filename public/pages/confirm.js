import React from 'react'
import { setCookie } from 'nookies'

import redirect from '../lib/redirect'

class Confirm extends React.Component {
  static async getInitialProps(ctx) {
    if (ctx.req.query.token) {
      await ctx.apolloClient.cache.reset()

      setCookie(ctx, 'token', ctx.req.query.token)
      redirect(ctx, '/')
    }

    return {}
  }
}

export default Confirm
