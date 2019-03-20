import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Container from '../components/Container'
import Heading from '../components/SectionHeading'
import Status from '../components/Status'
import Ticket, { fragment as ticketFragment } from '../components/Ticket'

const TicketsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-directon: row;
  flex-wrap: wrap;

  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 30px;
`

/* Tickets */

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
      <Query query={viewerQuery} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <Status>Nalagam...</Status>
          if (error) return <Status>Prišlo je do napake.</Status>

          if (data.viewer.tickets.length === 0) {
            return <Status>Nimaš še nobenih kart.</Status>
          }

          return (
            <TicketsWrapper>
              {data.viewer.tickets.map(ticket => (
                <Ticket key={ticket.id} ticket={ticket} />
              ))}
            </TicketsWrapper>
          )
        }}
      </Query>
    </Container>
  </React.Fragment>
)
