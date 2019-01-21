import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// Document

const meta = {
  url: 'https://events.gimb.io/',
  description: 'Spletna stran dogodkov na Gimnaziji Bežigrad.',
  keywords: 'Gimnazija, Bežigrad, dogodki, karte',
  thumbnail: 'https://znam.gimb.io/static/images/logo_large.png',
  googleSiteVerification: '',
}

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
            rel="stylesheet"
            href="/static/styles/fontawesome-all.min.css"
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
