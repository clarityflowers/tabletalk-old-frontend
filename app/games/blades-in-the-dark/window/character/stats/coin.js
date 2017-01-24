'use strict'

import React from 'react';
import styled from 'styled-components';

import { darken, lighten, fadeout } from 'utils/color-tools';
import Colors from 'games/blades-in-the-dark/common/colors';
import { Check, extendCheckArray } from 'games/blades-in-the-dark/window/common/check';

const shadow = darken(Colors.stone, 0.5);
const inset = `-1px 1px 1px 1px ${fadeout(shadow, .5)} inset`;
const outset = `-2px 2px 1px 0px ${fadeout(shadow, .7)}`;

const background = ({checked, highlight}) => {
  if (checked && highlight) {
    return Colors.fire;
  }
  if (!checked && highlight) {
    return darken(Colors.sand, 0.4);
  }
  if (checked && !highlight) {
    return Colors.sand;
  }
  if (!checked && !highlight) {
    return lighten(Colors.stone, 0.1);
  }
}
const Coin = styled(Check)`
  font-size: .5em;
  width: 1em;
  height: 1em;
  background-color: ${background};
  box-shadow: ${props => props.checked ? outset : inset};
  margin: 0.4em;
  box-shadow: $inset;
`;

const CoinArray = extendCheckArray(Coin);

export { Coin, CoinArray };
