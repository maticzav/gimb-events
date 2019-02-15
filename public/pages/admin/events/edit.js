import React from 'react'
import gql from 'graphql-tag'

import checkLoggedIn from '../../../lib/checkLoggedIn'
import redirect from '../../../lib/redirect'

import Container from '../../../components/Container'
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
    return (
      <React.Fragment>
        <Container>
          <Heading>Uredi dogodek</Heading>
        </Container>
        <Container>
          <EditableEvent
            initialValues={this.props.event}
            onSubmit={val => alert(val)}
            edit
          />
        </Container>
        <Footer />
      </React.Fragment>
    )
  }
}

export default EditEvent
