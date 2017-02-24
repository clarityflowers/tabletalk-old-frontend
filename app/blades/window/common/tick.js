'use strict'

import React from 'react';
import styled from 'styled-components';

import { extendCheck, extendCheckArray } from 'blades/window/common/check.js';

import Colors from 'blades/common/colors';
import { darken } from 'utils/color-tools';

const { sun, stone, textShadow } = Colors;
const background = darken(stone, 0.1);

const Svg = styled.svg`
  overflow: visible;
  filter: drop-shadow(${textShadow});
`;

const Polygon = styled.polygon`
  stroke-width: 10;
  stroke: ${sun};
  fill: darken(${stone}, 10%);
`

const Component = (props) => {
  return (
    <Svg x="0px"
         y="0px"
         preserveAspectRatio="none"
         width=".5em"
         height="1.3em"
         viewBox="0 0 60 110">
       <Polygon points="5,5 55,5 55,86 5,105" />
     </Svg>
   );
};

const Tick = styled(extendCheck(<Component/>))`
  font-size: 1em;
  width: auto;
  width: .5em;
  height: 1.3em;
  position: relative;
  &.checked svg polygon {
    fill: ${sun};
  }
`
const TickArray = extendCheckArray(Tick);

export { Tick, TickArray };
