import React from 'react'

import checkLoggedIn from '../../../lib/checkLoggedIn'
import redirect from '../../../lib/redirect'

import Container from '../../../components/Container'
import HeroMessage from '../../../components/HeroMessage'
import Heading from '../../../components/SectionHeading'

import EditableEvent from '../../../sections/EditableEvent'
import Footer from '../../../sections/Footer'

class NewEvent extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (!loggedInUser.viewer || !loggedInUser.viewer.isAdministrator) {
      redirect(ctx, '/')
    }

    return {}
  }

  emptyEvent = {
    id: 'NEW',
    name: '',
    speaker: '',
    description: '',
    location: '',
    period: '',
    date: new Date(),
    published: false,
    numberOfTickets: 1,
  }

  render() {
    return (
      <React.Fragment>
        <HeroMessage>
          Priporočam uporabo Google Chroma za administriranje Gimb Dogodkov. Pri
          drugih brskalnikih so možni občasni problemi.
        </HeroMessage>
        <Container>
          <Heading>Nov dogodek</Heading>
        </Container>
        <Container>
          <EditableEvent initialValues={this.emptyEvent} />
        </Container>
        <Footer />
      </React.Fragment>
    )
  }
}

export default NewEvent
