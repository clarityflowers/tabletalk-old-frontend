'use strict'

import React from 'react';
import styled from 'styled-components';

import { TickArray } from 'blades/window/common/tick.js';

const Array = styled(TickArray)`
  font-size: 1.5em;
  margin-top: .1em;
  position: relative;
  button:first-child:not(:last-child) {
    margin-right: .16em;
  }
  button:last-child:not(:first-child) {
    margin-left: .16em;
  }
  div.check {
    margin: 0 .16em;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    position: relative;
  }
`

export default Array;
