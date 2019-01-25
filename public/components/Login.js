import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

/* Components */

const LoginWrapper = styled.div`
  width: 100%;
`

const FormWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`

const SuccessMessage = styled.p`
  margin: 0;
  padding: 0;

  color: ${p => p.theme.colors.green};
`

const ErrorMessage = styled.p`
  margin: 0;
  padding: 0;

  color: ${p => p.theme.colors.red};
  font-size: 15px;

  ${phone(css`
    font-size: 12px;
  `)};
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
  mutation Login($email: String!) {
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
            const disabled = loading || this.state.email.trim().length === 0

            if (data && data.success) {
              return <SuccessMessage>Poglej svoj mail.</SuccessMessage>
            }

            return (
              <React.Fragment>
                <FormWrapper>
                  <Input
                    placeholder="Hey"
                    value={this.state.email}
                    onChange={this.changeEmailAddress}
                  />
                  <Button onClick={login} disabled={disabled}>
                    {loading ? 'Nalagam' : 'Prijava'}
                  </Button>
                </FormWrapper>
                {error && (
                  <ErrorMessage>
                    {error.message.replace('GraphQL error: ', '')}
                  </ErrorMessage>
                )}
              </React.Fragment>
            )
          }}
        </Mutation>
      </LoginWrapper>
    )
  }
}
