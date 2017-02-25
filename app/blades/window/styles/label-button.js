'use strict'

import React from 'react';
import styled from 'styled-components';

import Button from 'common/button';

import labelStyle from './label-style';

import Colors from 'blades/common/colors';
import { lighten } from 'utils/color-tools';

const { fire } = Colors;
const light = lighten(fire, 0.3);

const LabelButton = styled(Button)`
  ${labelStyle}
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

export default LabelButton
