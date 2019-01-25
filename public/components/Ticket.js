import gql from 'graphql-tag'
import React from 'react'
import styled from 'styled-components'

export const fragment = gql`
  fragment TicketInformation on Ticket {
    id
  }
`

const TicketWrapper = styled.div``

const Ticket = ({ data }) => <TicketWrapper>{data.id}</TicketWrapper>

export default Ticket
