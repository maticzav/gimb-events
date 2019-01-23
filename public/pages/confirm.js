import React from 'react'
import { setCookie } from 'nookies'

import redirect from '../lib/redirect'
import withData from '../hocs/withData'

class Confirm extends React.Component {
  static async getInitialProps(ctx, apollo) {
    await apollo.resetStore()

    setCookie(ctx, 'token')
    redirect(ctx, '/')

    return {}
  }
}

export default withData(Confirm)
