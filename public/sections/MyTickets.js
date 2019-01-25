import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

import Container from '../components/Container'
import Heading from '../components/SectionHeading'
import Ticket, { fragment as ticketFragment } from '../components/Ticket'

/* Events */

const viewerQuery = gql`
  query Viewer {
    viewer {
      id
      tickets {
        ...TicketInformation
      }
    }
  }

  ${ticketFragment}
`

export default () => (
  <React.Fragment>
    <Container>
      <Heading>Moje Karte</Heading>
    </Container>
    <Container>
      <Query query={viewerQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Nalagam...'
          if (error) return 'Prišlo je do napake.'

          if (!data.viewer) return 'Nalagam...'

          if (data.viewer.tickets.length === 0) return 'Nimaš še nobenih kart.'

          return (
            <React.Fragment>
              {data.viewer.tickets.map(ticket => (
                <Ticket key={ticket.id} data={ticket} />
              ))}
            </React.Fragment>
          )
        }}
      </Query>
    </Container>
  </React.Fragment>
)
