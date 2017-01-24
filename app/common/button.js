'use strict'

import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  font-size: 1em;
  &:focus {
    outline: none;
  }
  &::-moz-focus-inner {
    margin: 0;
    padding: 0;
    border-width: 0;
  }
  &:not(:disabled) {
    cursor: pointer;
  }
`

export default Button;
