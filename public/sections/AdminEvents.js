import React from 'react'
import { Query } from 'react-apollo'
import Link from 'next/link'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Button from '../components/Button'
import Container from '../components/Container'
import AdminEvent, {
  fragment as adminEventFragment,
} from '../components/AdminEvent'
import Heading from '../components/SectionHeading'
import Status from '../components/Status'

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 6px;
`

const Input = styled.input`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  font-size: 16px;
  padding: 0 6px;
  margin: 0;
  border: 0;

  line-height: 1;
  font-size: 14px;

  outline: none;
`

const NewEventWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 20px 10px;
`

const NewEventLink = styled(Button).attrs({
  as: 'a',
})``

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

const eventsQuery = gql`
  query AdminEvents($query: String!) {
    events(query: $query) {
      ${adminEventFragment}
    }
  }
`

class AdminEvents extends React.Component {
  state = {
    query: '',
  }

  handleQueryChange = e => {
    this.setState({ query: e.target.value })
  }

  render() {
    const { query } = this.state

    return (
      <React.Fragment>
        <Container>
          <Heading>Dogodki</Heading>
        </Container>
        <Container>
          <InputWrapper>
            <Input
              value={query}
              onChange={this.handleQueryChange}
              placeholder="Išči dogodke..."
            />
          </InputWrapper>

          <NewEventWrapper>
            <Link href="/admin/events/new">
              <NewEventLink>Ustvari nov dogodek</NewEventLink>
            </Link>
          </NewEventWrapper>
          <EventsWrapper>
            <Query
              query={eventsQuery}
              fetchPolicy="network-only"
              variables={{ query }}
            >
              {({ loading, error, data }) => {
                if (loading) return <Status>Nalagam...</Status>
                if (error) return <Status>Nekaj je šlo narobe!</Status>

                return data.events.map(event => (
                  <AdminEvent key={event.id} event={event} />
                ))
              }}
            </Query>
          </EventsWrapper>
        </Container>
      </React.Fragment>
    )
  }
}

export default AdminEvents
