'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
@import "~blades/window/styles/label";
`

const LabelButton = rx('button')`
  @include label;
  border: none;
  margin: 0;
  font-size: 1em;
  user-select: none;
  &::-moz-focus-inner {
    margin: 0;
    padding: 0;
    border-width: 0;
  }

  &:not(:disabled) {
    cursor: pointer;
    &:focus {
      outline: none;
      text-decoration: underline;
    }
    &:hover {
      color: $fire;
      & + div {
        button div.check:not(.checked):first-child svg polygon {
          fill: $fire;
        }
      }
    }
    &:active {
      color: lighten($fire, 30%);
    }
  }
`

export default LabelButton
