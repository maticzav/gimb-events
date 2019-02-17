import React from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Form, Field } from 'formik'
import gql from 'graphql-tag'
import { lighten, darken } from 'polished'
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

const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-directon: row;
  flex-wrap: wrap;

  padding: 10px;
  margin: 0;
`

const Flex = styled.div`
  width: auto;

  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
  max-width: 50%;

  margin: 0;
  padding: 0;

  ${phone(css`
    flex-basis: 100%;
    max-width: 100%;
  `)};
`

const Email = styled(Flex)`
  width: 100%;
  font-size: 14px;
  padding: 13px;

  ${phone(css`
    text-align: center;
    padding-bottom: 10px;
  `)};
`

const Settings = styled(Flex)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
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
  margin: 5px;

  box-shadow: rgba(12, 52, 75, 0.05) 0px 3px 3px;
  transition: all 0.2s linear 0s;

  &:hover {
    background: ${p => lighten(0.2, p.theme.colors.lightBlue)};
  }
`

const Checkbox = styled(Button).attrs(({ field, form }) => ({
  ...field,
  onClick: () => form.setFieldValue(field.name, !field.value),
}))`
  background: ${p =>
    p.value
      ? darken(0.2, p.theme.colors.green)
      : lighten(0.05, p.theme.colors.green)};
  &:hover {
    background: ${p =>
      p.value
        ? darken(0.1, p.theme.colors.green)
        : lighten(0.15, p.theme.colors.green)};
  }
`

/* Invite */

const inviteMutation = gql`
  mutation Invite($email: String!) {
    login(email: $email) {
      success
    }
  }
`

const InviteButton = styled(Button)`
  background: ${p => p.theme.colors.green};
`

const Invite = ({ email }) => (
  <Mutation mutation={inviteMutation} variables={{ email }}>
    {(invite, { loading }) => {
      return (
        <InviteButton onClick={invite} disabled={loading}>
          {loading ? 'Pošiljam' : 'Pošlji link'}
        </InviteButton>
      )
    }}
  </Mutation>
)

/* User Update */

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
      {update => (
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
              () => {
                actions.setSubmitting(false)
              },
            )
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Settings>
              <Form>
                <Field name="isModerator">
                  {props => <Checkbox {...props}>Moderator</Checkbox>}
                </Field>
                <Field name="isAdministrator">
                  {props => <Checkbox {...props}>Administrator</Checkbox>}
                </Field>
                <Invite email={user.email} />
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
