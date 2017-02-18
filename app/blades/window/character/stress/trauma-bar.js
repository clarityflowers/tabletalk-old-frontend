'use strict'

import React from 'react';
import styled from 'styled-components';

import Bar from 'blades/window/styles/bar';
import Label from 'blades/window/styles/label';
import TraumaList from './trauma-list';

import TickArray from 'blades/window/styles/tick-array';
import Array from 'blades/window/styles/thick-tick-array'

import Colors from 'blades/common/colors';
import { darken } from 'utils/color-tools';

const { stone, sun } = Colors;
const dark = darken(stone, 0.1);

const Container = styled(Bar)`
  flex: 1 1 auto;
  margin-left: 0em;
  z-index: 1;
  &:after {
    width: 100%;
    z-index: 0;
  }
`

// const Array = styled(TickArray)`
//   z-index: 2;
//   position: relative;
//   .check {
//     svg polygon {
//       fill: ${dark};
//       stroke: ${dark};
//     }
//     &.checked svg {
//       polygon {
//         stroke: ${sun};
//         fill: ${sun};
//       }
//     }
//   }
// `
const TraumaLabel = styled(Label)`
  text-align: center;
  box-shadow: none;
  box-sizing: border-box;
  width: 4.5em;
  position: absolute;
`

const TraumaBar = (props) => {
  const { trauma } = props;
  return (
    <Container>
      <TraumaLabel disabled>
        TRAUMA
      </TraumaLabel>
      <Array isButton={false} value={trauma.length} className='ticks' length={4}/>
      <TraumaList trauma={trauma}/>
    </Container>
  );
}

const { array } = React.PropTypes;
TraumaBar.propTypes = {
  trauma: array.isRequired
}

export default TraumaBar;
