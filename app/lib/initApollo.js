import { AsyncStorage } from 'react-native'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-client'

import { HttpLink } from 'apollo-link-http'
import { from, ApolloLink } from 'apollo-link'

let GRAPHQL_URL = 'https://dogodki.gimb.xyz/api'

export function create({ getToken }) {
  /* Links */

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin',
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

  const loggerLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(result => {
      if (process.browser && process.env.NODE_ENV !== 'production') {
        console.log(operation.operationName)
        console.log(operation)
        console.log(result)
      }
      return result
    })
  })

  const link = from([loggerLink, authLink, httpLink])

  /* Cache */

  const cache = new InMemoryCache()

  persistCache({
    cache,
    storage: AsyncStorage,
  })

  return new ApolloClient({ link, cache })
}
