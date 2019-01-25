import gql from 'graphql-tag'
import Link from 'next/link'
import React from 'react'
import { Query } from 'react-apollo'
import styled, { css } from 'styled-components'

import Container from '../components/Container'
import Login from '../components/Login'
import { phone, mobile } from '../utils/media'

const NavigationWrapper = styled.nav`
  width: 100%;
  margin: 0;
  border: 0;
`

/* Hero */

const Hero = styled.h1`
  width: min-content;

  margin: 0;

  padding-left: 10px;
  padding-top: 50px;
  padding-right: 10px;
  padding-bottom: 10px;

  color: ${p => p.theme.colors.black};
  font-family: Playfair Display;
  font-size: 60px;
  font-weight: 500;

  ${phone(css`
    font-size: 50px;
  `)};
`

/* Login */

const LoginWrapper = styled.div`
  padding: 10px;
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
    }
  }
`

export default () => (
  <NavigationWrapper>
    <Container>
      <Hero>Gimb Dogodki</Hero>
    </Container>

    <Query query={viewerQuery}>
      {({ loading, error, data }) => {
        if (loading) return 'Nalagam...'
        if (error) return 'Prišlo je do napake!'

        if (!data.viewer)
          return (
            <LoginWrapper>
              <Container>
                <Login />
              </Container>
            </LoginWrapper>
          )

        return (
          <Container>
            <NavigationItems>
              {pages.map(page => (
                <Link key={`${page.name}-${page.href}`} href={page.href}>
                  <NavigationItem>{page.name}</NavigationItem>
                </Link>
              ))}
            </NavigationItems>
          </Container>
        )
      }}
    </Query>
  </NavigationWrapper>
)
