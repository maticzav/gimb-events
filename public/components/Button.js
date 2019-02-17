import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const Button = styled.button`
  padding: 5px 12px;
  font-size: 20px;
  font-weight: 600;

  background: ${p => p.theme.colors.green};
  color: rgba(255, 255, 255, 0.85);
  border: none;
  cursor: pointer;
  overflow: none;
  outline: none;

  transform-origin: right center;
  transition: background 160ms ease-out, transform 160ms ease-out, color 160ms,
    box-shadow 160ms;

  margin-top: 8px;

  ${phone(css`
    margin-top: 18px;
    transform-origin: center center;
  `)};
`

export const InfoButton = styled(Button)`
  background: ${p => p.theme.colors.lightBlue};
`

export const SuccessButton = styled(Button)`
  background: ${p => p.theme.colors.green};
`

export const WarningButton = styled(Button)`
  background: ${p => p.theme.colors.red};
`

export default Button
