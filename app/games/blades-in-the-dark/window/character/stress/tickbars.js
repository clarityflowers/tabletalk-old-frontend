'use strict'

import React from 'react';
import cx from 'classnames';

import { TickArray } from 'games/blades-in-the-dark/window/common/tick.js';

const Stress = (props) => {
  const { disabled, stress, increment, decrement } = props;
  const checkedProps = {
    onClick: decrement
  }
  const uncheckedProps = {
    onClick: increment
  }
  return (
    <div className='stress bar'>
      <button className='label'
              onClick={increment}
              disabled={disabled || stress == 9}>
        STRESS
      </button>
      <TickArray value={stress} className='ticks' length={9}
                 disabled={disabled}
                 increment={increment} decrement={decrement}/>
    </div>
  );
}


Stress.propTypes = {
  stress: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

const Trauma = (props) => {
  const { count } = props;
  return (
    <div className='trauma bar'>
      <div className='label'>
        TRAUMA
      </div>
      <TickArray isButton={false} value={count} className='ticks' length={4}/>
    </div>
  );
}

Trauma.propTypes = {
  count: React.PropTypes.number.isRequired
}

const TraumaList = (props) => {
  const { trauma } = props;
  let traumas = [];
  for (let i=0; i<trauma.length; i++) {
    traumas.push(
      <div key={i} className='trauma'>
        {trauma[i].toUpperCase()}
      </div>
    )
  }
  return (
    <div className='trauma-list bar'>
      {traumas}
    </div>
  );
}

TraumaList.propTypes = {
  trauma: React.PropTypes.array.isRequired
}

const Tickbars = (props) => {
  const { trauma, stress, disabled, increment, decrement } = props;
  return(
    <div className='tickbars'>
      <Stress stress={stress} increment={increment} decrement={decrement}
              disabled={disabled}/>
      <Trauma count={trauma.length}/>
      <TraumaList trauma={trauma}/>
    </div>
  );
}

Tickbars.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

export default Tickbars;
