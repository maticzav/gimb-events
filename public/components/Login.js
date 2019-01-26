import React from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

import { phone } from '../utils/media'

/* Components */

const LoginWrapper = styled.span`
  display: block;
  max-width: 320px;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  text-align: center;
`

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 6px;
`

const EmailInput = styled.input.attrs(props => ({
  ...props.field,
  placeholder: 'matic@dijaki.gimb.org',
}))`
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

const Button = styled.button`
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  pointer-events: all;
  line-height: 1;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  color: white;
  background: ${p => p.theme.colors.green};
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 6px;

  outline: none;
  padding: 8px;

  box-shadow: rgba(12, 52, 75, 0.05) 0px 3px 3px;
  transition: all 0.2s linear 0s;
`

const Status = styled.p`
  margin: 0;
  padding: 3px;

  font-size: 14px;
  text-align: left;

  color: ${p => p.theme.colors.red};

  ${p =>
    p.success &&
    css`
      color: ${p.theme.colors.green};
    `};
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

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Vpisati moraš veljaven email!')
    .matches(
      new RegExp('/@dijaki.gimb.org$/'),
      'Vpisati moraš šolski email (@dijaki.gimb.org).',
    )
    .required('Vpisati moraš šolski email.'),
})

export default () => (
  <LoginWrapper>
    <Mutation mutation={loginMutation}>
      {(login, { data, loading, error }) => (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            alert(values)
            // error.message.replace('GraphQL error: ', '')
            login({ variables: { email: values.email } }).then(
              () => {
                actions.setSubmitting(false)
              },
              error => {
                actions.setSubmitting(false)
              },
            )
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <React.Fragment>
              <Form>
                <FormWrapper>
                  <Field type="email" name="email" component={EmailInput} />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Počakaj' : 'Vpiši se'}
                  </Button>
                </FormWrapper>
                <ErrorMessage name="email" component={Status} />
              </Form>
            </React.Fragment>
          )}
        </Formik>
      )}
    </Mutation>
  </LoginWrapper>
)
