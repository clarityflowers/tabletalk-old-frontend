'use strict'

import styled from 'styled-components';

import TickArray from 'blades/window/styles/tick-array.js';
import Colors from 'blades/common/colors';
import { lighten, darken } from 'utils/color-tools';

const { fire, sun, shadow, stone } = Colors;
const light = lighten(fire, 0.3);
const dark = darken(fire, 0.2);

const ThinTickArray = styled(TickArray)`
  z-index: 3;
  div.check {
    &:after {
      content: "";
      position: absolute;
      left: -.16em;
      top: 0;
      width: .16em;
      height: .34em;
      background: ${sun};
    }
  }
  button:first-child .check:first-child:after {
    content: none;
  }
  button:not(:disabled) {
    &:focus .check {
      &.checked:last-child svg polygon {
        fill: ${light};
      }
      &:not(.checked):first-child svg polygon {
        stroke: ${light};
      }
    }
    &:hover .check {
      &.checked:last-child svg polygon {
        fill: ${fire};
        stroke: ${fire};
      }
      &:not(.checked):first-child svg polygon {
        fill: ${fire};
      }
    }
    &:active .check {
      &.checked:last-child svg polygon {
        fill: ${light};
      }
      &:not(.checked):first-child svg polygon {
        fill: ${light};
      }
    }
  }
`

export default ThinTickArray;
