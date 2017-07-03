'use strict'

import React from 'react';
import rx from 'resplendence';

import { TickArray } from 'blades/window/common/tick.js';

const Array = rx(TickArray)`
  font-size: 1.5em;
  position: relative;
  button:first-child:not(:last-child) {
    margin-right: .16em;
  }
  button:last-child:not(:first-child) {
    margin-left: .16em;
  }
  div.check {
    &:not(:last-child) {
      margin-right: .16em;
    }
    &:not(:first-child) {
      margin-left: .16em;
    }
    position: relative;
  }
`

export default Array;
