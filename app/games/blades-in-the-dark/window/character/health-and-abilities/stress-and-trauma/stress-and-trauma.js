'use strict'

import React from 'react';
import cx from 'classnames';

import Tickbars from './tickbars';

import './stress-and-trauma.scss';

const TraumaList = (props) => {
  const { trauma, off, add } = props;
  const click = (name) => {
    return () => {
      add(name);
    };
  }
  let traumaList = [
    'Cold', 'Haunted', 'Obsessed',
    'Paranoid', 'Reckless', 'Soft',
    'Unstable', 'Vicious'
  ]
  let traumas = [];
  for (let i=0; i < traumaList.length; i++) {
    let show = true;
    for (let j=0; j < trauma.length; j++ ) {
      if (traumaList[i].toUpperCase() == trauma[j].toUpperCase()) {
        show = false;
      }
    }
    if (show) {
      traumas.push(
        <button key={i} className='trauma' disabled={off}
                onClick={click(traumaList[i].toUpperCase())}>
          {traumaList[i].toUpperCase()}
        </button>
      );
    }
  }
  let className = cx('trauma-list', {off})
  return (
    <div className={className}>
      {traumas}
    </div>
  );
}

TraumaList.propTypes = {
  trauma: React.PropTypes.array.isRequired,
  add: React.PropTypes.func.isRequired,
  off: React.PropTypes.bool.isRequired
}

TraumaList.defaultProps = {
  off: false
}

const StressAndTrauma = (props) => {
  const { stress, trauma, disabled, increment, decrement, add } = props;
  const showTraumaSelector = stress == 9;
  const addTrauma = (trauma) => {
    return null;
  }
  return(
    <div className='stress-and-trauma'>
      <Tickbars stress={stress}
                trauma={trauma}
                increment={increment}
                decrement={decrement}
                disabled={disabled}/>
      <TraumaList trauma={trauma}
                  off={disabled || !showTraumaSelector}
                  add={add.bind(this)}/>
    </div>
  );
}

StressAndTrauma.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  disabled: React.PropTypes.bool,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired
}

export default StressAndTrauma;
