import React from 'react'
import { getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import { parseCookies } from 'nookies'

import initApollo from './initApollo'

export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { res },
      } = ctx
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(ctx.ctx).token,
        },
      )

      ctx.ctx.apolloClient = apollo

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      if (!process.browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          // eslint-disable-next-line no-console
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    constructor(props) {
      super(props)
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token,
      })
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
