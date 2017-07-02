'use strict';

import React from 'react';
import rx from 'resplendence';

import CommonLink from 'utils/link';

rx`
@import "~common/colors";
`

const Link = rx(CommonLink)`--1
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
        color: lighten($hearts, 20%);
      }
    }
  }
`

export default Link;
