'use strict'

import React from 'react';
import rx from 'resplendence';

import { Check, extendCheckArray } from 'blades/window/common/check.js';

rx`
@import "~blades/common/colors";

$unchecked: mix($stone, desaturate($sun, 30%), 30%);
$checked: mix($stone, desaturate($sun, 20%), 90%);

`
const Dot = rx(Check)`
  font-size: .6em;
  width: 1em;
  height: 1em;
  position: relative;
  border-radius: 2em;
  padding: 0;
  box-sizing: border-box;
  margin: 0 1px;
  border: 4px solid $unchecked;
  background: $unchecked; 
  &.checked {
    border-color: $checked;
    background: $checked;
  }
`;

const DotArray = rx(extendCheckArray(Dot))`
  $light-hover: lighten($fire, 10%);
  $focus-checked: $sun;
  $active: lighten($fire, 30%);

  button {
    font-size: 1em;
    &:not(:disabled) {
      &:focus .check {
        &.checked:last-child {
          background: $sun;
        }
        &:not(.checked):first-child {
          background: $checked;
        }
      }
      &:hover .check {
        &.checked:last-child {
          border: $fire;
          background: $fire;
        }
        &:not(.checked):first-child {
          border: $light-hover;
          background: $light-hover;
        }
      }
      &:active .check {
        &.checked:last-child, &:not(.checked):first-child {
          border: $active;
          background: $active;
        }
      }
    }
  }
`;

export { Dot, DotArray };
