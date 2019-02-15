import React from 'react'
import { compose, graphql } from 'react-apollo'
import DayPicker from 'react-day-picker'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import gql from 'graphql-tag'
import moment from 'moment'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

import { fragment as eventFragment } from '../components/AdminEvent'
import { Input, DateInput, NumberInput } from '../components/Input'

import { mobile, phone } from '../utils/media'
import Button from '../components/Button'

/* Schema */

const eventSchema = Yup.object().shape({
  name: Yup.string().required('Naslov dogodka je obvezen!'),
  speaker: Yup.string().required('Govorec je obvezen!'),
  description: Yup.string().default(''),
  location: Yup.string().required('Kraj dogodka je obvezen!'),
  period: Yup.number()
    .integer()
    .min(0, 'Začneš lahko z najmanj preduro (0).')
    .max(13, 'Dan ima samo 13 šolskih ur.'),
  date: Yup.date().required('Datum dogodka ne sme manjkati!'),
  numberOfTickets: Yup.number()
    .integer()
    .min(1, 'Vsaj eno karto za dogodek rabiš.')
    .required('Vpisati moraš število vztopnic'),
})

/* Components */

const EventContainer = styled.div`
  width: auto;
  margin: auto 0;
  padding: 10px;
`

const EventName = styled(Input).attrs({
  placeholder: 'Naslov dogodka',
  minRows: 1,
})`
  font-weight: 600;
  font-size: 40px;
  font-family: Playfair Display;

  ${phone(css`
    font-size: 30px;
  `)};
`

const EventSpeaker = styled(Input).attrs({
  placeholder: 'Ime govorca',
})`
  font-weight: 400;
  font-size: 18px;
  padding: 3px 0;
`

const EventOverview = styled(Input).attrs({
  placeholder: 'Tukaj napiši opis dogodka...',
  minRows: 5,
})`
  font-weight: 400;
  font-size: 20px;
  padding: 5px 0;

  ${phone(css`
    font-size: 14px;
  `)}
`

const EventLocation = styled(Input).attrs({
  placeholder: 'Kraj...',
  minRows: 1,
})`
  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-size: 14px;
  `)}

  &:before {
    content: 'Kraj:\00a0';
  }
`

const EventPeriod = styled(NumberInput).attrs({
  placeholder: 'Ura dogodka...',
  maxRows: 1,
})`
  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-size: 14px;
  `)}

  &:before {
    content: 'Ura:\00a0';
  }
`

const EventDate = styled(DateInput).attrs(({ value }) => ({
  placeholder: 'DD/MM/YYYY',
  value: moment(value).format('YYYY-MM-DD'),
}))`
  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-size: 14px;
  `)}

  &:before {
    content: 'Datum:\00a0';
  }
`

const EventNumberOfTickets = styled(NumberInput).attrs({
  placeholder: 'Število vztopnic za dogodek',
})`
  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-size: 14px;
  `)}

  &:before {
    content: 'Število kart:\00a0';
  }
`

const CreateButton = styled(Button).attrs({
  type: 'submit',
})``

const UpdateButton = styled(Button).attrs({
  type: 'submit',
})`
  background: ${p => p.theme.colors.lightBlue};
`

const DeleteButton = styled(Button)`
  background: ${p => p.theme.colors.red};
`

const FormErrorMessage = styled.p`
  margin: 0;
  padding: 0;

  font-size: 14px;
  text-align: left;

  color: ${p => p.theme.colors.red};
`

/* GraphQL */

const createMutation = gql`
  mutation CreateEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      ${eventFragment}
    }
  }
`

const updateMutation = gql`
  mutation UpdateEvent($id: ID!, $data: UpdateEventInput!) {
    updateEvent(id: $id, data: $data) {
      ${eventFragment}
    }
  }
`

const deleteMutation = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      ${eventFragment}
    }
  }
`

/* Editable Event */

const EditableEvent = ({ initialValues, onSubmit, edit, onDelete }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={eventSchema}
    onSubmit={onSubmit}
  >
    <EventContainer>
      <Form>
        <Field name="name" component={EventName} />
        <ErrorMessage name="name" component={FormErrorMessage} />
        <Field name="speaker" component={EventSpeaker} />
        <ErrorMessage name="speaker" component={FormErrorMessage} />
        <Field name="description" component={EventOverview} />
        <ErrorMessage name="description" component={FormErrorMessage} />
        <Field name="location" component={EventLocation} />
        <ErrorMessage name="location" component={FormErrorMessage} />
        <Field name="period" component={EventPeriod} />
        <ErrorMessage name="period" component={FormErrorMessage} />
        <Field name="date" component={EventDate} />
        <ErrorMessage name="date" component={FormErrorMessage} />
        <Field name="numberOfTickets" component={EventNumberOfTickets} />
        <ErrorMessage name="numberOfTickets" component={FormErrorMessage} />
        {!edit && <CreateButton>Ustvari</CreateButton>}
        {edit && <UpdateButton>Shrani</UpdateButton>}
      </Form>
      {edit && <DeleteButton onClick={onDelete}>Izbriši</DeleteButton>}
    </EventContainer>
  </Formik>
)

export default compose(
  graphql(createMutation, {
    props: ({ edit, onSubmit, mutate }) => ({
      onSubmit: edit ? onSubmit : mutate,
    }),
  }),
  graphql(updateMutation, {
    props: ({ edit, onSubmit, mutate }) => ({
      onSubmit: edit ? mutate : onSubmit,
    }),
  }),
  graphql(deleteMutation, {
    props: ({ mutate }) => ({
      onDelete: mutate,
    }),
  }),
)(EditableEvent)
