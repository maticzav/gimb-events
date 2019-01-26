import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Container from '../components/Container'
import Event, { fragment as eventFragment } from '../components/AdminEvent'
import Heading from '../components/SectionHeading'

const EventsWrapper = styled.table`
  width: 100%;
  display: flex;
  flex-directon: row;
  flex-wrap: wrap;

  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 30px;
`

/* Events */

const eventsQuery = gql`
  query Feed {
    events {
      ...EventInformation
    }
  }

  ${eventFragment}
`

export default () => (
  <React.Fragment>
    <Container>
      <Heading>Dogodki</Heading>
    </Container>
    <Container>
      <Query query={eventsQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Nalagam...'
          if (error) return 'Prišlo je do napake.'

          if (data.feed.length === 0) return 'Na voljo ni nobenih dogodkov.'

          return (
            <EventsWrapper>
              {data.feed.map(event => (
                <Event key={event.id} event={event} />
              ))}
            </EventsWrapper>
          )
        }}
      </Query>
    </Container>
  </React.Fragment>
)
