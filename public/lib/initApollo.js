import fetch from 'isomorphic-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from, ApolloLink } from 'apollo-link'

let apolloClient = null

// Apollo server polyfill
if (!process.browser) {
  global.fetch = fetch
}

let GRAPHQL_URL = 'https://dogodki.gimb.io/api'

if (process.env.NODE_ENV !== 'production') {
  GRAPHQL_URL = 'http://localhost:4000'
}

function create(initialState = {}, { getToken }) {
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

  return new ApolloClient({
    connectToDevTools: process.browser,
    link,
    cache: new InMemoryCache().restore(initialState),
    ssrMode: !process.browser,
  })
}

export default function initApollo(initialState, options) {
  if (!process.browser) {
    return create(initialState, options)
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
