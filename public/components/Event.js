import React from 'react'
import { Mutation } from 'react-apollo'
import Card from 'card-vibes'
import gql from 'graphql-tag'
import hasher from 'hash-index'
import moment from 'moment'
import { invert, saturate, hsl } from 'polished'
import styled, { css } from 'styled-components'

import { mobile, phone } from '../utils/media'

export const fragment = gql`
  fragment EventInformation on Event {
    id
    name
    speaker
    description
    location
    period
    date
    viewerHasTicket
    viewerCanRequestTicket
    hasAvailableTickets
  }
`

const EventCardWrapper = styled.div`
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

    padding: 25px 8px;
  `)};
`

const EventWrapper = styled.div`
  width: 100%;

  padding: 16px;
  margin: 0;

  border-radius: 6px;

  ${p => {
    const base = hsl(hasher(p.name, 360), 0.5, 0.9)

    return css`
      background: linear-gradient(${base}, ${saturate(1, base)});
      color: ${invert(base)};
    `
  }};
`

const Name = styled.h2`
  display: block;

  margin: 0;
  padding: 0;

  font-weight: 600;
  font-size: 24px;
`

const Speaker = styled.h4`
  display: block;

  margin: 0;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 5px;

  font-weight: 400;
  font-size: 18px;
`

const Overview = styled.p`
  display: block;

  margin: 0;
  padding: 5px 0;

  font-weight: 400;
  font-size: 14px;
`

const LocationPeriod = styled.p`
  display: block;

  margin: 0;
  padding: 5px 0;

  font-weight: 400;
  font-size: 14px;
`

const Datum = styled.p`
  display: block;

  margin: 0;
  padding: 5px 0;

  font-weight: 400;
  font-size: 14px;
`

const Reservation = styled.button``

/* Reservation */

const reserveMutation = gql`
  mutation ReserveTicket($eventId: ID!) {
    requestTicket(eventId: $eventId) {
      id
      event {
        ...EventInformation
      }
      isValidated
      isExpired
    }
  }

  ${fragment}
`

/* Event */

const Event = ({ event }) => (
  <EventCardWrapper>
    <Card
      style={{
        padding: 0,
        borderRadius: '6px',
        width: 'auto',
      }}
    >
      <EventWrapper name={event.name}>
        <Name>{event.name}</Name>
        <Speaker>{event.speaker}</Speaker>
        <Overview>{event.description}</Overview>
        <LocationPeriod>
          {`${event.location}, ${event.period}. ura`}
        </LocationPeriod>
        <Datum>
          {moment(event.date)
            .locale('sl')
            .format('LL')}
        </Datum>
        <Mutation mutation={reserveMutation} variables={{ eventId: event.id }}>
          {(reserve, { data, loading, error }) => {
            if (event.viewerHasTicket) return 'Karto za ta dogodek že imaš!'
            if (!event.hasAvailableTickets)
              return 'Vse karte za ta dogodek so že pošle.'
            if (!event.viewerCanRequestTicket)
              return 'Te karte ne moraš rezervirat.'

            return (
              <Reservation onClick={reserve} disabled={loading}>
                Rezerviraj
              </Reservation>
            )
          }}
        </Mutation>
      </EventWrapper>
    </Card>
  </EventCardWrapper>
)

export default Event
