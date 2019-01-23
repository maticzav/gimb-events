import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'
import Container from '../components/Container'
import { phone, mobile } from '../utils/media'

const NavigationWrapper = styled.nav`
  width: 100%;
  margin: 0;
  border: 0;
`

/* Hero */

const Hero = styled.h1`
  width: min-content;

  margin-left: 10px;
  margin-top: 50px;
  margin-right: 10px;
  margin-bottom: 10px;

  padding: 0;

  color: ${p => p.theme.colors.black};
  font-family: Playfair Display;
  font-size: 60px;
  font-weight: 500;

  ${phone(css`
    font-size: 50px;
  `)};
`

/* Navigation */

const NavigationItems = styled.div`
  width: 100%;
  display: 'flex',
  flex-direction: horizontal;
`

const NavigationItem = styled.a`
  display: block;
  flex: 1;
  margin-top: 20px;
  font-size: 14px;
  color: ${p => p.theme.colors.green};
  text-decoration: none;
`

/* Login form */

const LoginForm = styled.div`
  height: 10px;
`

const pages = [
  { href: '/', name: 'Dogodki' },
  { href: '/me', name: 'Moje karte' },
  { href: '/logout', name: 'Odjava' },
]

export default () => (
  <NavigationWrapper>
    <Container>
      <Hero>Gimb Dogodki</Hero>
    </Container>
    <Container>
      <NavigationItems>
        {pages.map(page => (
          <Link key={`${page.name}-${page.href}`} href={page.href}>
            <NavigationItem>{page.name}</NavigationItem>
          </Link>
        ))}
      </NavigationItems>
    </Container>
  </NavigationWrapper>
)
