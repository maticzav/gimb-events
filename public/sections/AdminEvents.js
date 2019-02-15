import React from 'react'
import { Query } from 'react-apollo'
import Link from 'next/link'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'

import Container from '../components/Container'
import AdminEvent, {
  fragment as adminEventFragment,
  empty as emptyEvent,
} from '../components/AdminEvent'
import Heading from '../components/SectionHeading'

import { phone } from '../utils/media'

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

const NewEventLink = styled.a`
  padding: 5px 12px;
  font-size: 20px;
  font-weight: 600;

  background: ${p => p.theme.colors.green};
  color: rgba(255, 255, 255, 0.85);
  border: none;
  cursor: pointer;

  transform-origin: right center;
  transition: background 160ms ease-out, transform 160ms ease-out, color 160ms,
    box-shadow 160ms;

  ${phone(css`
    margin-top: 18px;
    transform-origin: center center;
  `)};
`

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
    return (
      <React.Fragment>
        <Container>
          <Heading>Dogodki</Heading>
        </Container>
        <Container>
          <InputWrapper>
            <Input
              value={this.state.query}
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
              variables={{ query: this.state.query }}
            >
              {({ loading, error, data }) => {
                if (loading) return 'Nalagam...'
                if (error) return JSON.stringify(error)

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
