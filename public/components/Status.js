import styled, { css } from 'styled-components'
import { phone } from '../utils/media'

export default styled.p`
  display: block;
  width: 100%;

  margin: 0;
  padding: 20px 0;
  font-weight: 500;
  font-size: 20px;

  color: ${p => p.theme.colors.greyText};
  text-align: center;

  ${phone(css`
    font-weight: 400;
    font-size: 15px;
  `)}
`
