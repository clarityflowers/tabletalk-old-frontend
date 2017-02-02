'use strict';

import React from 'react';
import styled from 'styled-components';

import CommonLink from 'utils/link';
import cz from 'utils/styled-classes';
import Colors from 'common/colors';
import { lighten } from 'utils/color-tools';

const { hearts } = Colors;

const Link = styled(cz(CommonLink, 'off'))`
  display: block;
  pointer-events: auto;
  position: relative;
  padding: 0 1em 0 7em;
  margin: 4em 0;
  transition-property: left, height, margin;
  transition-duration: .7s;
  max-width: 850px;
  width: 0;
  left: 0vw;
  height: 5em;
  transition-timing-function: cubic-bezier(0.730, -0.300, 0.375, 1.360);
  &.off {
    margin: -0.5em;
    height: 1em;
  }
  &:focus {
    outline: none;
  }
  &:not(.disabled) {
    cursor: pointer;
    &:focus {
      outline: none;
      .icon {
        width: 7em;
        height: 7em;
        left: -.5em;
        top: -2em;
      }
      .label {
        text-decoration: underline;
      }
      .plus {
        transform: scale(1.15);
      }
    }
    &:hover {
      .label {
        color: ${lighten(hearts, 0.2)}
      }
    }
  }
`

export default Link;
