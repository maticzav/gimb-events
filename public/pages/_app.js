import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Progress from 'nprogress'
import { createGlobalStyle } from 'styled-components'

import { Navigation } from '../components/navigation'

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
  @font-face {
    font-family: odin;
    src: url("/static/fonts/odin.otf")
  }
  @font-face {
    font-family: grandhotel;
    src: url("/static/fonts/grandhotel.otf")
  }
  body {
    margin: 0;
    padding: 0;
    font-family: odin;
    font-size: 16px;
  }
  html,
  body {
    height: 100%;
  }
  body > div:first-child,
  body > div:first-child > div:first-child,
  body > div:first-child > div:first-child > div {
    height: inherit;
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

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <GlobalStyle />
        <Navigation />
        <Component {...pageProps} />
      </Container>
    )
  }
}
