'use strict'

import React from 'react';
import styled from 'styled-components';

import Button from 'common/button';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { lighten } from 'utils/color-tools';

const { fire, sun, shadow, stone } = Colors;
const light = lighten(fire, 0.3);

const Label = styled(Button)`
  font: ${Fonts.h1};
  padding: 0 .25em;
  position: relative;
  z-index: 5;
  background: ${sun};
  color: ${stone};
  box-shadow: ${shadow};
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
