'use strict'

import React from 'react';
import cx from 'classnames';

import { makeTickArray } from './tick.js';

import './tickbars.scss';

const Tickbars = (props) => {
  const { trauma, stress, onButtonClick } = props;
  let traumas = [];
  for (let i=0; i<trauma.length; i++) {
    traumas.push(
      <button key={i} className='trauma'>
        {trauma[i].toUpperCase()}
      </button>
    )
  }
  return(
    <div className='tickbars'>
      <div className='stress bar'>
        <div className='label'>
          STRESS
        </div>
        <div className='ticks'>
          {makeTickArray({value: stress, max: 9})}
        </div>
      </div>
      <div className='trauma bar'>
        <button className='label' onClick={onButtonClick}>
          TRAUMA
        </button>
        <div className='ticks'>
          {makeTickArray({value: trauma.length, max: 4, onClick: onButtonClick, disableChecked: true})}
        </div>
      </div>
      <div className='trauma-list bar'>
        {traumas}
      </div>
    </div>
  );
}

Tickbars.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  onButtonClick: React.PropTypes.func.isRequired
}

export default Tickbars;
