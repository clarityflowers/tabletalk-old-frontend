'use strict'

import React from 'react';
import styled from 'styled-components';


import Colors from 'blades/common/colors.js';
import { lighten, darken, mix, desaturate } from 'utils/color-tools';
import { Check, extendCheckArray } from 'blades/window/common/check.js';

const unchecked = mix(Colors.stone, desaturate(Colors.sun, .6), 0.8);
const checked = mix(Colors.stone, desaturate(Colors.sun, .6), 0.1);
const lightHover = lighten(Colors.fire, 0.1);
const focusChecked = Colors.sun;
const active = lighten(Colors.fire, 0.3);

const Dot = styled(Check)`
  font-size: .6em;
  background: $sun;
  width: 1em;
  height: 1em;
  position: relative;
  border-radius: 2em;
  padding: 0;
  box-sizing: border-box;
  margin: 0 1px;
  border: 4px solid ${props => props.checked ? checked : unchecked};
  background: ${props => props.checked ? checked : unchecked};
`;

const DotArray = styled(extendCheckArray(Dot))`
  button {
    font-size: 1em;
    &:not(:disabled) {
      &:focus .check {
        &.checked:last-child {
          background: ${Colors.sun}
        }
        &:not(.checked):first-child {
          background: ${checked}
        }
      }
      &:hover .check {
        &.checked:last-child {
          border: ${Colors.fire};
          background: ${Colors.fire};
        }
        &:not(.checked):first-child {
          border: ${lightHover};
          background: ${lightHover};
        }
      }
      &:active .check {
        &.checked:last-child, &:not(.checked):first-child {
          border: ${active};
          background: ${active};
        }
      }
    }
  }
`;

export { Dot, DotArray };
