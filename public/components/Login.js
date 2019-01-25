import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

/* Components */

const LoginWrapper = styled.span`
  width: auto;
  max-width: 340px;
  margin: 0;
  padding: 0;
`

const FormWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 6px;
`

const Input = styled.input`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  font-size: 16px;
  padding: 0 3px;
  margin: 0;
`

const Button = styled.button`
  display: inline-flex;
  width: auto;
  cursor: pointer;
  line-height: 1;
  font-size: 14px;
  text-transform: uppercase;
  white-space: nowrap;
  scrollbehavior: ;
`

const SuccessMessage = styled.p`
  margin: 0;
  padding: 0;

  color: ${p => p.theme.colors.green};
`

const ErrorMessage = styled.p`
  margin: 0;
  padding: 0;

  color: ${p => p.theme.colors.white};
  font-size: 15px;

  ${phone(css`
    font-size: 12px;
  `)};
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
                    placeholder="matic@dijaki.gimb.org"
                    value={this.state.email}
                    onChange={this.changeEmailAddress}
                  />
                  <Button onClick={login} disabled={disabled}>
                    {loading ? 'Počakaj' : 'Vpiši se'}
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
