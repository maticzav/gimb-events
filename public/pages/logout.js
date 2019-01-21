import React from 'react'
import { destroyCookie } from 'nookies'

import redirect from '../lib/redirect'
import withData from '../hocs/withData'

class SignOut extends React.Component {
  static async getInitialProps(ctx, apollo) {
    await apollo.resetStore()

    destroyCookie(ctx, 'token')
    redirect(ctx, '/')

    return {}
  }
}

export default withData(SignOut)
