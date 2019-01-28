import { AsyncStorage } from 'react-native'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

import { HttpLink } from 'apollo-link-http'
import { from, ApolloLink } from 'apollo-link'

let GRAPHQL_URL = 'https://dogodki.gimb.xyz/api'

export function create({ getToken }) {
  /* Links */

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    crendetials: true,
  })

  const authLink = new ApolloLink((operation, forward) => {
    const token = getToken()

    operation.setContext(({ headers = {} }) => ({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
        ...headers,
      },
    }))

    return forward(operation)
  })

  const link = from([authLink, httpLink])

  /* Cache */

  const cache = new InMemoryCache()

  return new ApolloClient({ link, cache })
}
