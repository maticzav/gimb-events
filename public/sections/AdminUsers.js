import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Container from '../components/Container'
import User, { fragment as userFragment } from '../components/User'
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

const UsersWrapper = styled.div`
  width: 100%;
  display: block;

  padding: 0;
  margin: 0;
`

/* Events */

const usersQuery = gql`
  query Feed($query: String) {
    users(query: $query) {
      ...UserInformation
    }
  }

  ${userFragment}
`

class AdminUsers extends React.Component {
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
          <Heading>Uporabniki</Heading>
        </Container>
        <Container>
          <InputWrapper>
            <Input
              value={query}
              onChange={this.handleQueryChange}
              placeholder="Išči..."
            />
          </InputWrapper>

          <Query
            query={usersQuery}
            fetchPolicy="network-only"
            variables={{ query }}
          >
            {({ loading, error, data }) => {
              if (loading) return <Status>Nalagam...</Status>
              if (error) return <Status>Prišlo je do napake.</Status>

              if (data.users.length === 0) {
                return <Status>Ne najdem nobenih uporabnikov.</Status>
              }

              return (
                <UsersWrapper>
                  {data.users.map(user => (
                    <User key={user.id} user={user} />
                  ))}
                </UsersWrapper>
              )
            }}
          </Query>
        </Container>
      </React.Fragment>
    )
  }
}

export default AdminUsers
