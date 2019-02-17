import React from 'react'
import gql from 'graphql-tag'

import checkLoggedIn from '../../../lib/checkLoggedIn'
import redirect from '../../../lib/redirect'

import Container from '../../../components/Container'
import HeroMessage from '../../../components/HeroMessage'
import Heading from '../../../components/SectionHeading'

import { fragment as eventFragment } from '../../../components/AdminEvent'
import EditableEvent from '../../../sections/EditableEvent'
import Footer from '../../../sections/Footer'

class EditEvent extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (
      !loggedInUser.viewer ||
      !loggedInUser.viewer.isAdministrator ||
      !ctx.query.id
    ) {
      redirect(ctx, '/')
    }

    const event = await ctx.apolloClient
      .query({
        query: gql`
        query EventQuery($id: ID!) {
          event(id: $id) {
            ${eventFragment}
          }
        }
      `,
        variables: {
          id: ctx.query.id,
        },
      })
      .then(res => res.data.event)

    if (!event) {
      redirect(ctx, '/admin')
    }

    return { event }
  }

  render() {
    const { event } = this.props

    return (
      <React.Fragment>
        <HeroMessage>
          Priporočam uporabo Google Chroma za administriranje Gimb Dogodkov. Pri
          drugih brskalnikih so možni občasni problemi.
        </HeroMessage>
        <Container>
          <Heading>Uredi dogodek</Heading>
        </Container>
        <Container>
          <EditableEvent initialValues={event} edit />
        </Container>
        <Footer />
      </React.Fragment>
    )
  }
}

export default EditEvent
