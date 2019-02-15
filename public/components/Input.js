import React from 'react'
import TextArea from 'react-textarea-autosize'
import styled, { css } from 'styled-components'

export const DateInput = styled.input.attrs(({ field, ...props }) => ({
  ...props,
  ...field,
  type: 'date',
}))`
  display: block;

  width: 100%;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
`

export const Input = styled(TextArea).attrs(({ field, ...props }) => ({
  ...props,
  ...field,
}))`
  display: block;

  width: 100%;
  height: min-content;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;

  resize: none;
`

export const NumberInput = styled.input.attrs(({ field, ...props }) => ({
  ...props,
  ...field,
  type: 'number',
}))`
  display: block;

  width: 100%;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
`
