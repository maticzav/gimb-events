import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const Heading = styled.h2`
  margin: 0;
  padding: 10px;

  font-weight: 600;
  font-size: 50px;

  color: ${p => p.theme.colors.darkText};

  ${phone(css`
    font-size: 30px;
  `)};
`

export default Heading
