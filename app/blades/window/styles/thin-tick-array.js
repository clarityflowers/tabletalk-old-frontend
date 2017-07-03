'use strict'

import rx from 'resplendence';

import TickArray from 'blades/window/styles/tick-array.js';

rx`
@import "~blades/common/colors";
`

const ThinTickArray = rx(TickArray)`--1
  $dark: darken($fire, 20%);
  $light: lighten($fire, 30%);
  z-index: 3;
  div.check {
    &:after {
      content: "";
      position: absolute;
      left: -.16em;
      top: 0;
      width: .16em;
      height: .34em;
      background: $sun;
    }
  }
  button:first-child .check:first-child:after {
    content: none;
  }
  button:not(:disabled) {
    &:focus .check {
      &.checked:last-child svg polygon {
        fill: $light;
      }
      &:not(.checked):first-child svg polygon {
        stroke: $light;
      }
    }
    &:hover .check {
      &.checked:last-child svg polygon {
        fill: $fire;
        stroke: $fire;
      }
      &:not(.checked):first-child svg polygon {
        fill: $fire;
      }
    }
    &:active .check {
      &.checked:last-child svg polygon {
        fill: $light;
      }
      &:not(.checked):first-child svg polygon {
        fill: $light;
      }
    }
  }
`

export default ThinTickArray;
