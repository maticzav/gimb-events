import React from 'react'
import { ApolloProvider } from 'react-apollo'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import Progress from 'nprogress'
import { createGlobalStyle, css, ThemeProvider } from 'styled-components'
import withApollo from '../lib/withApollo'

import Navigation from '../sections/Navigation'

import { phone } from '../utils/media'
import meta from '../utils/meta'
import { BASE_MOBILE_FONT_SIZE, BASE_FONT_SIZE } from '../utils/rem'
import { theme } from '../utils/theme'

// NProgress

let progress

const stopProgress = () => {
  clearTimeout(progress)
  Progress.done()
}

Router.onRouteChangeStart = () => {
  progress = setTimeout(Progress.start, 0)
}

Router.onRouteChangeComplete = stopProgress
Router.onRouteChangeError = stopProgress

// Global

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Work Sans", sans-serif;
    font-size: ${BASE_FONT_SIZE}px;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;

    ${phone(css`
      font-size: ${BASE_MOBILE_FONT_SIZE}px;
    `)};
  }

  body > div:first-child,
  body > div:first-child > div:first-child,
  body > div:first-child > div:first-child > div {
    height: inherit;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  ::selection {
    background: black;
    color: white;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: linear-gradient(to right, cyan, blue, violet);;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
`

/* App */

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>{meta.title}</title>
        </Head>

        <ThemeProvider theme={theme}>
          <Container>
            <ApolloProvider client={apolloClient}>
              <GlobalStyle />
              <Navigation />
              <Component {...pageProps} />
            </ApolloProvider>
          </Container>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withApollo(MyApp)
