import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Container from '../components/Container'
import AdminEvent, {
  fragment as adminEventFragment,
} from '../components/AdminEvent'
import Heading from '../components/SectionHeading'

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

          <Query
            query={eventsQuery}
            fetchPolicy="network-only"
            variables={{ query: this.state.query }}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Nalagam...'
              if (error) return JSON.stringify(error)

              if (data.events.length === 0) return 'Ne najdem nobenih dogodkov.'

              return (
                <EventsWrapper>
                  {data.events.map(event => (
                    <AdminEvent key={event.id} event={event} />
                  ))}
                </EventsWrapper>
              )
            }}
          </Query>
        </Container>
      </React.Fragment>
    )
  }
}

export default AdminEvents
