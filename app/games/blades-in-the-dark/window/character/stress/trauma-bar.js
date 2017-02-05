'use strict'

import React from 'react';
import styled from 'styled-components';

import Bar from './bar';
import Label from './label';

import TickArray from './tick-array.js';

import Colors from 'games/blades-in-the-dark/common/colors';
import { darken } from 'utils/color-tools';

const { stone, sun } = Colors;
const dark = darken(stone, 0.1);

const Container = styled(Bar)`
  flex: 0 0 auto;
  margin-left: -.5em;
  z-index: 1;
  &:after {
    content: none;
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
  width: calc(100% - .5em);
  box-sizing: border-box;
  position: absolute;
  left: .5em;
`

const TraumaBar = (props) => {
  const { count } = props;
  return (
    <Container>
      <TraumaLabel disabled>
        TRAUMA
      </TraumaLabel>
      <Array isButton={false} value={count} className='ticks' length={4}/>
    </Container>
  );
}

TraumaBar.propTypes = {
  count: React.PropTypes.number.isRequired
}

export default TraumaBar;
