'use strict'

import React from 'react';

import { makeCheckboxArray, Checkbox } from './checkbox.js';

import './money.scss';

const StashRow = (props) => {
  return (
    <div className='row'>
      {makeCheckboxArray({value: props.value, max: 9})}
      <Checkbox checked={props.value >= 10} className='end'/>
    </div>
  );
}

StashRow.propTypes = {
  value: React.PropTypes.number.isRequired
}

const Money = (props) => {
  let stash = [];
  for (let i=0; i < 4; i++) {
    stash.push(
      <StashRow key={i} value={props.stash - (i * 10)}/>
    )
  }
  return (
    <div className='money'>
      <div className='column coin'>
        <div className='row stash'>
          <div className='stash label'>STASH</div>
        </div>
        <div className='row coin'>
          <div className='coin label'>COIN</div>
        </div>
        <div className='row coin'>
          {makeCheckboxArray({value: props.coin, max: 2})}
        </div>
        <div className='row coin'>
          {makeCheckboxArray({value: props.coin - 2, max: 2})}
        </div>
      </div>
      <div className='column stash'>
        {stash}
      </div>
    </div>
  );
}

Money.propTypes = {
  coin: React.PropTypes.number.isRequired,
  stash: React.PropTypes.number.isRequired
}

export default Money;
