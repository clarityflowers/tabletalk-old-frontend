'use strict'

import React from 'react';
import rx from 'resplendence';

const Button = rx('button')`
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  font-size: 1em;
  user-select: none;
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
