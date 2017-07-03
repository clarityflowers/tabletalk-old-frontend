'use strict'

import React from 'react';
import rx from 'resplendence';

import Bar from 'blades/window/styles/bar';
import Label from 'blades/window/styles/label-button';
import TraumaList from './trauma-list';

import TickArray from 'blades/window/styles/tick-array';
import Array from 'blades/window/styles/thick-tick-array'

const Container = rx(Bar)`
  flex: 1 1 auto;
  margin-left: 0em;
  z-index: 1;
  &:after {
    width: 100%;
    z-index: 0;
  }
`
const Ticks = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
`
const TraumaLabel = rx(Label)`--1
  text-align: center;
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;
  position: absolute;
`

const TraumaBar = (props) => {
  const { trauma, bonus } = props;
  return (
    <Container>
      <Ticks>
        <TraumaLabel disabled>
          TRAUMA
        </TraumaLabel>
        <Array isButton={false} value={trauma.length} className='ticks' length={4 + bonus}/>
      </Ticks>
      <TraumaList trauma={trauma}/>
    </Container>
  );
}

const { array, number } = React.PropTypes;
TraumaBar.propTypes = {
  trauma: array.isRequired,
  bonus: number
}
TraumaBar.defaultProps = {
  bonus: 0
}

export default TraumaBar;
