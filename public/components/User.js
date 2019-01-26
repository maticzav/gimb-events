import React from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

import { phone } from '../utils/media'

export const fragment = gql`
  fragment UserInformation on User {
    id
    email
    isModerator
    isAdministrator
  }
`

const UserWrapper = styled.tr`
  width: 100%;
  margin: 0;
  padding: 0;
`

const Email = styled.td`
  width: 100%;
  font-size: 14px;
`

const Settings = styled.td`
  display: flex;
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
  background: ${p => p.theme.colors.lightBlue};
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

/* Mutation */

const updateUserMutation = gql`
  mutation Login($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      email
      isAdministrator
      isModerator
    }
  }
`

/* Form */

const userSettingsSchema = Yup.object().shape({
  isModerator: Yup.boolean().required(),
  isAdministrator: Yup.boolean().required(),
})

export default ({ user }) => (
  <UserWrapper>
    <Email>{user.email}</Email>

    <Mutation mutation={updateUserMutation}>
      {(update, { data, loading, error }) => (
        <Formik
          initialValues={{
            isModerator: user.isModerator,
            isAdministrator: user.isAdministrator,
          }}
          validationSchema={userSettingsSchema}
          onSubmit={(values, actions) => {
            update({
              variables: {
                id: user.id,
                data: {
                  isModerator: values.isModerator,
                  isAdministrator: values.isAdministrator,
                },
              },
            }).then(
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
            <Settings>
              <Form>
                <Field type="checkbox" name="isModerator" />
                <Field type="checkbox" name="isAdministrator" />
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Počakaj' : 'Potrdi'}
                </Button>
              </Form>
            </Settings>
          )}
        </Formik>
      )}
    </Mutation>
  </UserWrapper>
)
