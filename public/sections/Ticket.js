import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import QRCode from 'qrcode.react'
import styled, { css } from 'styled-components'

import Container from '../components/Container'

import { mobile, phone } from '../utils/media'

const TicketWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const Name = styled.h2`
  display: block;

  margin: 0;
  padding: 40px 0;

  font-weight: 600;
  font-size: 30px;

  color: black;

  ${phone(css`
    font-size: 24px;
  `)};
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

  margin: 0 auto;
  padding: 0;
`

const Owner = styled.p`
  display: block;
  margin: 0;
  padding: 30px 0;

  font-size: 15px;
`

export const ticketQuery = gql`
  query Ticket($id: ID!) {
    ticket(id: $id) {
      id
      event {
        id
        name
      }
      owner {
        id
        email
      }
      isValidated
      isExpired
    }
  }
`

export default ({ id }) => (
  <Query query={ticketQuery} variables={{ id: id }} errorPolicy="ignore">
    {({ data, loading, error }) => {
      if (loading)
        return (
          <Container>
            <Status>Nalagam...</Status>
          </Container>
        )
      if (error)
        return (
          <Container>
            <Status>Prišlo je do napake.</Status>
          </Container>
        )

      if (!data.ticket)
        return (
          <Container>
            <Status>Prijavit se moraš!</Status>
          </Container>
        )

      return (
        <TicketWrapper>
          <Name>{data.ticket.event.name}</Name>
          <Code value={data.ticket.id} />
          <Owner>{data.ticket.owner.email}</Owner>
        </TicketWrapper>
      )
    }}
  </Query>
)
