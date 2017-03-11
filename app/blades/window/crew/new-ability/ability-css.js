'use strict';

import { css } from 'styled-components';

import Colors from 'blades/common/colors';

const { sun, sand, fire } = Colors;

const abilityCSS = css`
  color: ${sun};
  text-align: left;
  margin: .5em 0;
  opacity: 0.6;
  transition: opacity .15s;
  .name {
    transition: color .15s;
    color: ${sand};
  }
  &:not(:disabled):not(.disabled) {
    &:focus {
      text-decoration: none;
      .name {
        text-decoration: underline;
      }
    }
    &:hover {
      opacity: 1;
      .name {
        color: ${fire};
      }
    }
  }
`

export default abilityCSS;
