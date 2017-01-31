'use strict';

import React from 'react';
import styled from 'styled-components';

import CommonLink from 'utils/link';
import cz from 'utils/styled-classes';

const Link = styled(cz(CommonLink, 'off'))`
  display: block;
  pointer-events: auto;
  position: relative;
  padding: 3em 1em 3em 7em;
  margin: 0 0 -1em 0;
  height: 7em;
  transition-property: left, height, padding, margin;
  transition-duration: .7s;
  max-width: 850px;
  left: 0vw;
  transition-timing-function: cubic-bezier(0.730, -0.300, 0.375, 1.360);
  &.off {
    height: 1em;
    padding: 0 1em 0 7em;
  }
  &:focus {
    outline: none;
  }
  &:not(.disabled) {
    &:focus {
      outline: none;
      .icon {
        width: 7em;
        height: 7em;
        left: -.5em;
        top: 1em;
      }
      .label {
        text-decoration: underline;
      }
      .plus {
        transform: scale(1.15);
      }
    }
  }
`

export default Link;
