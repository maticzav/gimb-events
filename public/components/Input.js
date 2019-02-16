import React from 'react'
import TextArea from 'react-textarea-autosize'
import styled, { css } from 'styled-components'

export const InputContainer = styled.div`
  display: block;

  width: 100%;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
`

export const DateInput = styled.input.attrs(({ field, ...props }) => ({
  ...props,
  ...field,
  type: 'date',
}))`
  width: 100%;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;

  font-family: monospace;

  align-items: center;
  display: -webkit-inline-flex;
  -webkit-appearance: textfield;
  background-color: white;
  -webkit-rtl-ordering: logical;
  padding-inline-start: 1px;
  cursor: default;
  overflow: hidden;
`

export const Input = styled(TextArea).attrs(({ field, ...props }) => ({
  ...props,
  ...field,
}))`
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
  width: 100%;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
`
