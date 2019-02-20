import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Container from '../components/Container'
import Event, { fragment as eventFragment } from '../components/PublicEvent'
import Heading from '../components/SectionHeading'
import Status from '../components/Status'

const EventsWrapper = styled.div`
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

const feedQuery = gql`
  query Feed {
    feed {
      ${eventFragment}
    }
  }
`

export default () => (
  <React.Fragment>
    <Container>
      <Heading>Dogodki</Heading>
    </Container>
    <Container>
      <Query query={feedQuery} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <Status>Nalagam...</Status>
          if (error) return <Status>Prišlo je do napake.</Status>

          if (data.feed.length === 0)
            return <Status>Na voljo ni nobenih dogodkov.</Status>

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
