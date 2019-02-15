import React from 'react'
import { Mutation } from 'react-apollo'
import Link from 'next/link'
import Card from 'card-vibes'
import gql from 'graphql-tag'
import hasher from 'hash-index'
import moment from 'moment'
import { invert, saturate, hsl } from 'polished'
import styled, { css } from 'styled-components'

import { mobile, phone } from '../utils/media'

export const fragment = `
  id
  name
  speaker
  description
  location
  period
  date
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

const EditLink = styled.a`
  padding: 8px 12px;
  font-size: 20px;
  font-weight: 600;

  background: ${p => p.theme.colors.lightBlue};
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
  </EventWrapper>
)

export default AdminEvent
