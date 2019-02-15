import React from 'react'
import { Mutation } from 'react-apollo'
import TextArea from 'react-textarea-autosize'
import Card from 'card-vibes'
import { Formik, Form, Field } from 'formik'
import gql from 'graphql-tag'
import hasher from 'hash-index'
import moment from 'moment'
import { invert, saturate, hsl } from 'polished'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

import { mobile, phone } from '../utils/media'

/* Because of the delegation issue */
export const fragment = `
  id
  name
  speaker
  description
  location
  period
  date
  published
  numberOfTickets
  numberOfReservations
  numberOfValidatedTickets
`

const EventWrapper = styled.div`
  width: auto;

  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
  max-width: 50%;

  margin: 0;
  padding: 30px;

  ${phone(css`
    flex-basis: 100%;
    max-width: 100%;

    padding: 10px 8px;
  `)};
`

const Name = styled(Input).attrs({
  placeholder: 'Naslov dogodka',
  minRows: 2,
})`
  font-weight: 600;
  font-size: 30px;
  font-family: Playfair Display;

  color: ${p => hsl(hasher(p.value, 360), 1, 0.1)};

  ${phone(css`
    font-size: 24px;
  `)};
`

const Speaker = styled(Input).attrs({
  placeholder: 'Ime govorca',
})`
  padding: 3px 0;

  font-weight: 400;
  font-size: 18px;
`

const Overview = styled(Input).attrs({
  placeholder: 'Opis...',
  minRows: 5,
})`
  padding: 5px 0;

  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-weight: 400;
    font-size: 14px;
  `)}
`

const Datum = styled.p`
  display: block;

  margin: 0;
  padding: 5px 0;

  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-weight: 400;
    font-size: 14px;
  `)}
`

const Status = styled.p`
  display: block;
  width: 100%;

  margin: 0;
  padding: 5px 0;
  font-weight: 500;
  font-size: 20px;

  ${phone(css`
    font-weight: 400;
    font-size: 15px;
  `)}

  ${p =>
    p.success &&
    css`
      color: ${p.theme.colors.green};
    `};
`

const Button = styled.button`
  padding: 5px 12px;
  font-size: 20px;
  font-weight: 600;

  background: ${p => p.theme.colors.red};
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

/* Create */

export const empty = {
  id: 'NEW',
  name: '',
  speaker: '',
  description: '',
  location: '',
  // period: undefined,
  // date: "",
  published: false,
  numberOfTickets: 1,
  numberOfReservations: 0,
  numberOfValidatedTickets: 0,
}

/* Mutations */

const createMutation = gql`
  mutation CreateEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      ${fragment}
    }
  }
`

const updateMutation = gql`
  mutation UpdateEvent($id: ID!, $data: UpdateEventInput!) {
    updateEvent(id: $id, data: $data) {
      ${fragment}
    }
  }
`

const deleteMutation = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      ${fragment}
    }
  }
`

const getEventMutation = event => {
  if (event.id === 'NEW') {
    return createMutation
  } else {
    return updateMutation
  }
}

/* Schema */

const eventSchema = Yup.object().shape({
  name: Yup.string().required(),
  speaker: Yup.string().required(),
  description: Yup.string().default(''),
  location: Yup.string().required(),
  period: Yup.number()
    .integer()
    .min(0, 'Začneš lahko z najmanj preduro (0).')
    .max(13, 'Dan ima samo 13 šolskih ur.'),
  date: Yup.date().required(),
  numberOfTickets: Yup.number()
    .integer()
    .min(1, 'Vsaj eno karto za dogodek rabiš.'),
})

/* Event */

export default ({ event }) => (
  <Mutation mutation={getEventMutation(event)}>
    {(createOrUpdate, { loading, data, error }) => (
      <Formik
        initialValues={event}
        validationSchema={eventSchema}
        onSubmit={(values, formik) => {
          console.log(values)
        }}
      >
        <EventWrapper>
          <Form>
            <Field name="name" component={Name} />
            <Field name="speaker" component={Speaker} />
            <Field name="description" component={Overview} />
            <LocationPeriod>
              <Field name="location" width={150} component={Location} />
              <Field name="period" width={25} component={Period} />
              {'. ura'}
            </LocationPeriod>
            <Datum>
              {moment(event.date)
                .locale('sl')
                .format('LL')}
            </Datum>
            <Button type="submit" disabled={loading}>
              {loading ? 'Nalagam' : 'Dodaj'}
            </Button>
          </Form>
        </EventWrapper>
      </Formik>
    )}
  </Mutation>
)
