import React from 'react'
import Link from 'next/link'
import hasher from 'hash-index'
import moment from 'moment'
import { hsl } from 'polished'
import styled, { css } from 'styled-components'

import Button from './Button'

import { phone } from '../utils/media'

export const fragment = `
  id
  name
  speaker
  description
  location
  period
  date
  numberOfTickets
  published
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

const Name = styled.h2`
  display: block;

  margin: 0;
  padding: 0;

  font-weight: 600;
  font-size: 30px;
  font-family: Playfair Display;

  color: ${p => hsl(hasher(p.children, 360), 1, 0.1)};

  ${phone(css`
    font-size: 24px;
  `)};
`

const Speaker = styled.h4`
  display: block;

  margin: 0;
  padding: 3px 0;

  font-weight: 400;
  font-size: 18px;
`

const Overview = styled.p`
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

const LocationPeriod = styled.p`
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

const Datum = styled.p`
  display: block;

  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 5px;
  padding-bottom: 15px;

  font-weight: 400;
  font-size: 20px;

  ${phone(css`
    font-weight: 400;
    font-size: 14px;
  `)}
`

const EditLink = styled(Button).attrs({
  as: 'a',
})`
  background: ${p => p.theme.colors.lightBlue};
`

const Status = styled.p`
  display: block;
  width: 100%;

  margin: 0;
  padding: 5px 0;
  font-weight: 500;
  font-size: 18px;
  font-family: monospace;

  color: ${p => p.theme.colors.red};

  ${phone(css`
    font-weight: 400;
    font-size: 14px;
  `)}
`

/* Event */

const AdminEvent = ({ event }) => (
  <EventWrapper>
    <Name>{event.name}</Name>
    <Speaker>{event.speaker}</Speaker>
    <Overview>{event.description}</Overview>
    <LocationPeriod>{`${event.location}, ${event.period}. ura`}</LocationPeriod>
    <Datum>
      {moment(event.date)
        .locale('sl')
        .format('LL')}
    </Datum>
    <Link href={{ pathname: '/admin/events/edit', query: { id: event.id } }}>
      <EditLink>Uredi</EditLink>
    </Link>
    {!event.published && <Status>Dogodek ni objavljen.</Status>}
  </EventWrapper>
)

export default AdminEvent
