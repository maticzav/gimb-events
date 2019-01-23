import React from 'react'
import { destroyCookie } from 'nookies'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

class MePage extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (!loggedInUser.viewer) {
      redirect(ctx, '/')
    }

    return {}
  }

  render() {
    return <div>ME</div>
  }
}

export default MePage
