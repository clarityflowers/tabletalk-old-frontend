'use strict'

import React from 'react';
import styled from 'styled-components';

import Button from 'common/button';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { lighten } from 'utils/color-tools';

const { fire, sun, shadow, stone } = Colors;
const light = lighten(fire, 0.3);

const Label = styled(Button)`
  font: ${Fonts.h1};
  box-shadow: ${shadow};
  padding: 0 .25em;
  position: relative;
  z-index: 4;
  background: ${sun};
  color: ${stone};
  &:not(:disabled) {
    cursor: pointer;
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      color: ${fire};
      & + div {
        button div.check:not(.checked):first-child svg polygon {
          fill: ${fire};
        }
      }
    }
    &:active {
      color: ${light};
    }
  }
`

export default Label;
