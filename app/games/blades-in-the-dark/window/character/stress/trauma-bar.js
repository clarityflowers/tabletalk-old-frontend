'use strict'

import React from 'react';
import styled from 'styled-components';

import Bar from './bar';
import Label from './label';
import TraumaList from './trauma-list';

import TickArray from './tick-array.js';

import Colors from 'games/blades-in-the-dark/common/colors';
import { darken } from 'utils/color-tools';

const { stone, sun } = Colors;
const dark = darken(stone, 0.1);

const Container = styled(Bar)`
  flex: 1 1 auto;
  margin-left: -.5em;
  z-index: 1;
  &:after {
    left: 0.5em;
  }
`

const Array = styled(TickArray)`
  z-index: 2;
  position: relative;
  .check {
    margin-left: 0.33em;
    svg polygon {
      fill: ${dark};
      stroke: ${dark};
    }
    &.checked svg {
      polygon {
        stroke: ${sun};
        fill: ${sun};
      }
    }
  }
`
const TraumaLabel = styled(Label)`
  text-align: center;
  box-shadow: none;
  box-sizing: border-box;
  width: 4.6em;
  position: absolute;
  left: .5em;
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
