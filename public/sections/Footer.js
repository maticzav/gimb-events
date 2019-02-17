import React from 'react'
import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const Wrapper = styled.footer`
  margin-top: 120px;
  padding: 30px 30px;
  text-align: center;
  font-size: 15px;
  opacity: 0.7;

  transition: opacity 100ms;

  &:hover {
    opacity: 1;
  }

  ${phone(css`
    margin-top: 10px;
  `)};
`

const LinkItem = styled.a`
  display: inline-block;
  margin-right: 15px;
  color: #555;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }
`

const Footer = () => (
  <Wrapper>
    <p>
      Made with{' '}
      <span role="img" aria-label="love">
        ❤️
      </span>{' '}
      by <a href="https://www.instagram.com/maticzavadlal/">Matic Zavadlal</a>
    </p>
    <p>
      <LinkItem href="/privacy">Privacy Policy</LinkItem>{' '}
      <LinkItem href="/terms">Terms</LinkItem>
    </p>
  </Wrapper>
)

export default Footer
