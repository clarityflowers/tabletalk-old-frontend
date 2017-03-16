'use strict'

import styled from 'styled-components';

import Link from 'utils/link';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { lighten, darken } from 'utils/color-tools';

import cz from 'utils/styled-classes';

const { fire, sand, stone, textShadow } = Colors;
const { h1 } = Fonts;

const NewAbilityLink = styled(cz(Link, null, 'disabled'))`
  font: ${h1};
  align-self: center;
  color: ${darken(stone, 0.1)};
  transition: color .15s, text-shadow .15s;
  margin-top: .5em;
  font-size: 1.25em;
  user-select: none;
  &:not(.disabled) {
    text-shadow: ${textShadow};
    color: ${sand};
    &:hover {
      color: ${fire};
    }
    &:active {
      color: ${lighten(fire, 0.3)};
    }
  }
  &.disabled {
    cursor: default;
  }
`

export default NewAbilityLink;
