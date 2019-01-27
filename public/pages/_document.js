import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { meta } from '../utils/meta'

// Document

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="google-site-verification"
            content={meta.googleSiteVerification}
          />

          <meta charSet="UTF-8" />
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

          <meta name="theme-color" content="#DB3F74" />

          <meta name="keywords" content={meta.keywords} />
          <meta name="description" content={meta.description} />

          <meta property="og:type" content="article" />
          <meta property="og:url" content={meta.url} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image:url" content={meta.thumbnail} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.thumbnail} />

          <link rel="canonical" href={meta.url} />

          <meta
            key="contentType"
            httpEquiv="Content-Type"
            content="text/html;charset=UTF-8"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:700|Work+Sans:400,600"
            rel="stylesheet"
          />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
