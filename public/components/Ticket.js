import React from 'react'
import gql from 'graphql-tag'
import hasher from 'hash-index'
import moment from 'moment'
import { invert, saturate, hsl } from 'polished'
import QRCode from 'qrcode.react'
import styled, { css } from 'styled-components'

import { mobile, phone } from '../utils/media'

export const fragment = gql`
  fragment TicketInformation on Ticket {
    id
    event {
      id
      name
      speaker
      description
      location
      period
      date
    }
    isValidated
    isExpired
  }
`

const TicketWrapper = styled.div`
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

const Code = styled(QRCode)`
  display: block;
  width: auto;

  text-align: center;
`

const Ticket = ({ ticket }) => (
  <TicketWrapper>
    <Name>{ticket.event.name}</Name>
    <Speaker>{ticket.event.speaker}</Speaker>
    <Overview>{ticket.event.description}</Overview>
    <LocationPeriod>
      {`${ticket.event.location}, ${ticket.event.period}. ura`}
    </LocationPeriod>
    <Datum>
      {moment(ticket.event.date)
        .locale('sl')
        .format('LL')}
    </Datum>
    <Code value={ticket.id} />
  </TicketWrapper>
)

export default Ticket
