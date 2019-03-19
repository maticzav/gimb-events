import gql from 'graphql-tag'
import Link from 'next/link'
import React from 'react'
import { Query } from 'react-apollo'
import styled, { css } from 'styled-components'

import Container from '../components/Container'
import Login from '../components/Login'
import { phone } from '../utils/media'

const NavigationWrapper = styled.nav`
  width: 100%;
  margin: 0;
  border: 0;
  padding-bottom: 10px;
`

/* Hero */

const Hero = styled.h1`
  width: min-content;

  margin: 0;

  padding-left: 10px;
  padding-top: 50px;
  padding-right: 10px;
  padding-bottom: 0;

  color: ${p => p.theme.colors.black};
  font-family: Playfair Display;
  font-size: 60px;
  font-weight: 500;

  ${phone(css`
    font-size: 50px;
  `)};
`

const SubHeading = styled.h2`
  width: 100%;

  margin: 0;
  padding-left: 12px;
  padding-top: 10px;
  padding-right: 12px;
  padding-bottom: 10px;

  color: ${p => p.theme.colors.black};
  font-size: 20px;
  font-weight: 500;

  ${phone(css`
    font-size: 18px;
  `)};
`

/* Navigation */

const NavigationItems = styled.div`
  width: 100%;
  padding: 10px;
  margin: 0;
`

const NavigationItem = styled.a`
  margin: 10px;

  color: ${p => p.theme.colors.green};
  font-size: 20px;
  text-decoration: none;

  ${phone(css`
    font-size: 14px;
  `)};

  cursor: pointer;
`

/* Admin */

const AdminNavigation = styled.div`
  width: 100%;
  padding: 10px 20px;
  margin: 0;

  color: ${p => p.theme.colors.red};
  font-size: 20px;
  text-decoration: none;

  ${phone(css`
    font-size: 14px;
  `)};
`

const AdminLink = styled.a`
  display: inline;
  margin: 0;
  padding: 0;

  color: ${p => p.theme.colors.red};
  font-size: 20px;
  text-decoration: underline;

  ${phone(css`
    font-size: 14px;
  `)};

  cursor: pointer;
`

/* Moderator */

const ModeratorNavigation = styled.div`
  width: 100%;
  padding: 10px 20px;
  margin: 0;

  color: ${p => p.theme.colors.lightBlue};
  font-size: 20px;
  text-decoration: none;

  ${phone(css`
    font-size: 14px;
  `)};
`

const ModeratorLink = styled.a`
  display: inline;
  margin: 0;
  padding: 0;

  color: ${p => p.theme.colors.lightBlue};
  font-size: 20px;
  text-decoration: underline;

  ${phone(css`
    font-size: 14px;
  `)};

  cursor: pointer;
`

const pages = [
  { href: '/', name: 'Dogodki' },
  { href: '/me', name: 'Moje karte' },
  { href: '/logout', name: 'Odjava' },
]

const viewerQuery = gql`
  query Viewer {
    viewer {
      id
      email
      isModerator
      isAdministrator
    }
  }
`

export default () => (
  <NavigationWrapper>
    <Container>
      <Hero>Gimb Dogodki</Hero>
      <SubHeading>Spletna stran dogodkov na Gimnaziji Bežigrad</SubHeading>
    </Container>
    <Container>
      <Query query={viewerQuery}>
        {({ loading, error, data }) => {
          if (!data.viewer || loading || error) {
            return <Login />
          }

          return (
            <React.Fragment>
              <NavigationItems>
                {pages.map(page => (
                  <Link key={`${page.name}-${page.href}`} href={page.href}>
                    <NavigationItem>{page.name}</NavigationItem>
                  </Link>
                ))}
              </NavigationItems>
              {data.viewer.isModerator && (
                <ModeratorNavigation>
                  Za dostop do čitalca klikni ta{' '}
                  <ModeratorLink href="https://expo.io/@maticzav/gimbdogodki">
                    link
                  </ModeratorLink>
                  .
                </ModeratorNavigation>
              )}
              {data.viewer.isAdministrator && (
                <AdminNavigation>
                  Za urejanje dogodkov obišči{' '}
                  <Link href="/admin">
                    <AdminLink>administratorsko stran</AdminLink>
                  </Link>
                  .
                </AdminNavigation>
              )}
            </React.Fragment>
          )
        }}
      </Query>
    </Container>
  </NavigationWrapper>
)
