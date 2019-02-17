import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import HeroMessage from '../components/HeroMessage'

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
        <HeroMessage>
          Na vhodu moraš pokazati svojo karto. Karto za posamezni dogodek si
          lahko rezerviraš pri dogodkih, vstopnico pa najdeš pri vsaki karti
          posebaj.
        </HeroMessage>
        <MyTickets />
        <Footer />
      </React.Fragment>
    )
  }
}

export default MePage
