'use strict'

import React from 'react';
import rx from 'resplendence';

import { Check, extendCheckArray } from 'blades/window/common/check';

rx`
@import "~blades/common/colors";
`

const Coin = rx(Check)`
  $shadow: darken($stone, 50%);

  font-size: .5em;
  width: 1em;
  height: 1em;
  margin: 0.4em;
  background: lighten($stone, 10%);
  box-shadow: -1px 1px 1px 1px fade-out($shadow, .5) inset;
  &.highlight {
    background: darken($sand, 40%);
  }
  &.checked {
    box-shadow: -2px 2px 1px 0px fade-out($shadow, .7);
    background: $sand;
    &.highlight {
      background: $fire;
    }
  }
`;

const CoinArray = extendCheckArray(Coin);

export { Coin, CoinArray };
