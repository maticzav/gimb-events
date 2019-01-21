import React from 'react'
import styled from 'styled-components'

import { blue, white, grey, navigationHeight } from '../utils/constants'

const NavigationWrapper = styled.nav`
  width: 100%;
  height: ${navigationHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  line-height: 63px;
  text-align: center;
  background-color: ${white};
  border: 0;
  border-bottom: 1px solid ${grey};
`

const Logo = styled.h1`
  margin: 0;
  padding: 0;
  color: ${blue};
  font-family: grandhotel;
  font-size: 35px;
`

export const Navigation = () => (
  <NavigationWrapper>
    <Logo>Gimb Dogodki</Logo>
  </NavigationWrapper>
)
