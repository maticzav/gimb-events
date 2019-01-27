import React from 'react'

import checkLoggedIn from '../../lib/checkLoggedIn'
import redirect from '../../lib/redirect'

import Container from '../../components/Container'
import Heading from '../../components/SectionHeading'

// import Events from '../sections/Events'
import AdminUsers from '../../sections/AdminUsers'
import Footer from '../../sections/Footer'

class Admin extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (!loggedInUser.viewer || !loggedInUser.viewer.isAdministrator) {
      redirect(ctx, '/')
    }

    return {}
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Heading>Administrator</Heading>
        </Container>
        {/* <Events /> */}
        <AdminUsers />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Admin
