import gql from 'graphql-tag'

export const fragment = gql`
  fragment EventInformation on Event {
    id
    name
    speaker
    description
    location
    period
    date
    published
  }
`
