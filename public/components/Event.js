import React from 'react'
import Card from 'card-vibes'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'

import { mobile, phone } from '../utils/media'

export const fragment = gql`
  fragment EventInformation on Event {
    id
    name
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
  padding: 10px;

  ${phone(css`
    flex-basis: 100%;
    max-width: 100%;
  `)};
`

const EventWrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin: 0;
`

const Name = styled.h2`
  display: block;

  margin: 0;
  padding: 0;

  font-weight: 600;
`

const Speaker = styled.h5`
  display: block;

  margin: 0;
  padding: 0;

  font-weight: 600;
`

const Overview = styled.p`
  display: block;

  margin: 0;
  padding: 0;

  font-weight: 400;
  font-size: 14px;
`

const Event = ({ data }) => (
  <EventCardWrapper>
    <Card
      style={{
        padding: '8px',
        borderRadius: '6px',
        width: 'auto',
      }}
    >
      <EventWrapper>
        <Name>{data.name}</Name>
        <Speaker>{data.speaker}</Speaker>
        <Overview>{data.description}</Overview>
      </EventWrapper>
    </Card>
  </EventCardWrapper>
)

export default Event
