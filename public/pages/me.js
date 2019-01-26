import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import MyTickets from '../sections/MyTickets'
import Footer from '../sections/Footer'

class MePage extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (!loggedInUser.viewer) {
      redirect(ctx, '/')
    }

    return {}
  }

  render() {
    return (
      <React.Fragment>
        <MyTickets />
        <Footer />
      </React.Fragment>
    )
  }
}

export default MePage
