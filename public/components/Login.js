import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

/* Components */

const LoginWrapper = styled.div`
  width: 100%;
`

const Input = styled.input`
  display: inline;
  width: 90%;
  max-width: 400px;
`

const Button = styled.button`
  display: inline-block;
  width: 100px;
`

/* Mutation */

const loginMutation = gql`
  mutation Login($email: String) {
    login(email: $email) {
      success
    }
  }
`

/* Form */

export default class Login extends React.Component {
  state = { email: '' }

  changeEmailAddress = e => {
    this.setState({ email: e.target.value })
  }

  render() {
    return (
      <LoginWrapper>
        <Mutation
          mutation={loginMutation}
          variables={{ email: this.state.email }}
        >
          {(login, { data, loading, error }) => {
            if (loading) return 'Nalagam...'

            return (
              <React.Fragment>
                <Input
                  placeholder="Hey"
                  value={this.state.email}
                  onChange={this.changeEmailAddress}
                />
                <Button onClick={login}>Prijava</Button>
              </React.Fragment>
            )
          }}
        </Mutation>
      </LoginWrapper>
    )
  }
}
