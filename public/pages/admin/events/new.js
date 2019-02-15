import React from 'react'

import checkLoggedIn from '../../../lib/checkLoggedIn'
import redirect from '../../../lib/redirect'

import Container from '../../../components/Container'
import Heading from '../../../components/SectionHeading'

import EditableEvent from '../../../sections/EditableEvent'

class NewEvent extends React.Component {
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
          <Heading>Nov dogodek</Heading>
        </Container>
        <Container>
          <EditableEvent initialValues={{}} />
        </Container>
      </React.Fragment>
    )
  }
}

export default NewEvent
