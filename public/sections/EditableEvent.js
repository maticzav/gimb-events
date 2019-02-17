import React from 'react'
import { compose, graphql } from 'react-apollo'
import DayPicker from 'react-day-picker'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import gql from 'graphql-tag'
import moment from 'moment'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

import { fragment as eventFragment } from '../components/AdminEvent'
import {
  InputContainer,
  Input,
  DateInput,
  NumberInput,
} from '../components/Input'

import { mobile, phone } from '../utils/media'
import Button from '../components/Button'
import redirect from '../lib/redirect'

/* Schema */

const eventSchema = Yup.object().shape({
  name: Yup.string().required('Naslov dogodka je obvezen!'),
  speaker: Yup.string().required('Govorec je obvezen!'),
  description: Yup.string().default(''),
  location: Yup.string().required('Kraj dogodka je obvezen!'),
  period: Yup.number('Ura mora biti številka.')
    .integer()
    .min(0, 'Začneš lahko z najmanj preduro (0).')
    .max(13, 'Dan ima samo 13 šolskih ur.')
    .required(),
  date: Yup.date('Vpisati moraš veljaven datum.').required(
    'Datum dogodka ne sme manjkati!',
  ),
  numberOfTickets: Yup.number('Število kart mora biti številka.')
    .integer('Število kart mora biti celo število.')
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
    font-size: 16px;
  `)}
`

const EventLocation = styled(Input).attrs({
  placeholder: 'Kje se bo dogodek odvijal?',
  minRows: 1,
})`
  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-size: 16px;
  `)}
`
const EventLocationLabel = styled.label`
  font-weight: 600;
  font-size: 20px;

  ${phone(css`
    font-size: 16px;
  `)}
`

const EventPeriod = styled(NumberInput).attrs({
  placeholder: 'Katero uro se dogodek začne?',
  maxRows: 1,
})`
  font-weight: 400;
  font-size: 20px;
  font-family: monospace;

  ${phone(css`
    font-size: 16px;
  `)}
`

const EventPeriodLabel = styled.label`
  font-weight: 600;
  font-size: 20px;

  ${phone(css`
    font-size: 16px;
  `)}
`

const EventDate = styled(DateInput).attrs(({ value }) => ({
  placeholder: 'DD/MM/YYYY',
  value: moment(value).format('YYYY-MM-DD'),
}))`
  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-size: 16px;
  `)}
`

const EventDateLabel = styled.label`
  font-weight: 600;
  font-size: 20px;

  ${phone(css`
    font-size: 16px;
  `)}
`

const EventNumberOfTickets = styled(NumberInput).attrs({
  placeholder: 'Število vstopnic za dogodek...',
})`
  font-weight: 400;
  font-size: 20px;
  font-family: monospace;

  ${phone(css`
    font-size: 16px;
  `)}
`

const EventNumberOfTicketsLabel = styled.label`
  font-weight: 600;
  font-size: 20px;

  ${phone(css`
    font-size: 16px;
  `)}
`

const CreateButton = styled(Button).attrs({
  type: 'submit',
})`
  margin: 5px;
`

const UpdateButton = styled(Button).attrs({
  type: 'submit',
})`
  background: ${p => p.theme.colors.lightBlue};
  margin: 5px;
`

const DeleteButton = styled(Button).attrs({
  type: 'button',
})`
  background: ${p => p.theme.colors.red};
  margin: 5px;
`

const FormErrorMessage = styled.p`
  margin: 0;
  padding: 0;

  font-size: 16px;
  text-align: left;

  color: ${p => p.theme.colors.red};

  ${phone(css`
    font-size: 14px;
  `)}
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

class EditableEvent extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleSubmit(values, actions) {
    const { edit, createEvent, updateEvent, initialValues } = this.props

    actions.setSubmitting(true)

    const data = {
      name: values.name,
      speaker: values.speaker,
      description: values.description,
      location: values.location,
      period: values.period,
      date: values.date,
      numberOfTickets: values.numberOfTickets,
    }

    if (edit) {
      await updateEvent({
        variables: { id: initialValues.id, data: data },
      }).then(res => {
        redirect({}, '/admin')
      })
    } else {
      await createEvent({ variables: { data: data } }).then(res => {
        redirect({}, '/admin')
      })
    }

    actions.setSubmitting(false)
  }

  async handleDelete() {
    const { deleteEvent, initialValues } = this.props

    await deleteEvent({
      variables: { id: initialValues.id },
    }).then(res => {
      redirect({}, '/admin')
    })
  }

  render() {
    const { initialValues, edit, deleteEventLoading } = this.props

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={eventSchema}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <EventContainer>
            <Form>
              <InputContainer>
                <Field name="name" component={EventName} />
                <ErrorMessage name="name" component={FormErrorMessage} />
              </InputContainer>
              <InputContainer>
                <Field name="speaker" component={EventSpeaker} />
                <ErrorMessage name="speaker" component={FormErrorMessage} />
              </InputContainer>
              <InputContainer>
                <Field name="description" component={EventOverview} />
                <ErrorMessage name="description" component={FormErrorMessage} />
              </InputContainer>
              <InputContainer>
                <EventLocationLabel>{`Kraj: `}</EventLocationLabel>
                <Field name="location" component={EventLocation} />
                <ErrorMessage name="location" component={FormErrorMessage} />
              </InputContainer>
              <InputContainer>
                <EventPeriodLabel>{`Ura: `}</EventPeriodLabel>
                <Field name="period" component={EventPeriod} />
                <ErrorMessage name="period" component={FormErrorMessage} />
              </InputContainer>
              <InputContainer>
                <EventDateLabel>{`Datum: `}</EventDateLabel>
                <Field name="date" component={EventDate} />
                <ErrorMessage name="date" component={FormErrorMessage} />
              </InputContainer>
              <InputContainer>
                <EventNumberOfTicketsLabel>{`Število vstopnic: `}</EventNumberOfTicketsLabel>
                <Field
                  name="numberOfTickets"
                  component={EventNumberOfTickets}
                />
                <ErrorMessage
                  name="numberOfTickets"
                  component={FormErrorMessage}
                />
              </InputContainer>
              <InputContainer>
                {!edit && (
                  <CreateButton>
                    {isSubmitting ? 'Ustvarjam...' : 'Ustvari'}
                  </CreateButton>
                )}
                {edit && (
                  <UpdateButton>
                    {isSubmitting ? 'Shranjujem...' : 'Shrani'}
                  </UpdateButton>
                )}
                {edit && (
                  <DeleteButton onClick={this.handleDelete}>
                    {deleteEventLoading ? 'Brišem...' : 'Izbriši'}
                  </DeleteButton>
                )}
              </InputContainer>
            </Form>
          </EventContainer>
        )}
      </Formik>
    )
  }
}

export default compose(
  graphql(createMutation, {
    options: {
      refetchQueries: ['events', 'feed'],
    },
    props: ({ mutate }) => ({
      createEvent: mutate,
    }),
  }),
  graphql(updateMutation, {
    options: {
      refetchQueries: ['events', 'feed'],
    },
    props: ({ mutate }) => ({
      updateEvent: mutate,
    }),
  }),
  graphql(deleteMutation, {
    options: {
      refetchQueries: ['events', 'feed'],
      onCompleted: () => {
        redirect({}, '/admin')
      },
    },
    props: ({ mutate }) => ({
      deleteEvent: mutate,
    }),
  }),
)(EditableEvent)
