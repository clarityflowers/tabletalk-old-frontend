'use strict'

import React from 'react';
import {css} from 'styled-components';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';

const { shadow, stone, sun } = Colors;

const labelStyle = css`
  font: ${Fonts.h1};
  padding: 0 .25em;
  position: relative;
  z-index: 5;
  background: ${sun};
  color: ${stone};
  box-shadow: ${shadow};
`

export default labelStyle;
