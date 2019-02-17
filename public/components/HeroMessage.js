import React from 'react'
import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import { rem } from '../utils/rem'

export const WIDE_WIDTH = 1000
export const NORMAL_WIDTH = 900
export const SIDE_PADDINGS = 30

const HeroMessageContainer = styled.div`
  max-width: ${p => (p.wide ? rem(WIDE_WIDTH) : rem(NORMAL_WIDTH))};
  margin: 0 auto;
  padding: 10px ${SIDE_PADDINGS}px;
  box-sizing: content-box;
`

const HeroMessage = styled.div`
  width: 100%;
  margin: 0;
  padding: 12px;

  font-weigth: 400;
  font-size: 14px;
  color: white;

  border: 0;
  border-radius: 8px;

  background: ${p => lighten(0.12, p.theme.colors.lightBlue)};

  ${({ success }) =>
    success &&
    css`
      background: ${p => lighten(0.12, p.theme.colors.green)};
    `}

  ${({ warning }) =>
    warning &&
    css`
      background: ${p => lighten(0.12, p.theme.colors.red)};
    `}
`

export default ({ children, ...props }) => (
  <HeroMessageContainer {...props}>
    <HeroMessage {...props}>{children}</HeroMessage>
  </HeroMessageContainer>
)
