import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import Ticket from '../sections/Ticket'
import Footer from '../sections/Footer'

class MyTicket extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (!loggedInUser.viewer) {
      redirect(ctx, '/')
    }

    return { id: ctx.query.id }
  }

  render() {
    const { id } = this.props

    return (
      <React.Fragment>
        <Ticket id={id} />
        <Footer />
      </React.Fragment>
    )
  }
}

export default MyTicket
