'use strict'

import React from 'react';
import cx from 'classnames';

import StressAndTrauma from './stress-and-trauma';

import './health-and-items.scss';

const HealthAndItems = (props) => {
  return (
    <div className='health-and-items'>
      <StressAndTrauma stress={props.stress} trauma={props.trauma}/>
    </div>
  )
}

HealthAndItems.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  healing: React.PropTypes.object.isRequired,
  harm: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  equipment: React.PropTypes.object.isRequired
}

export default HealthAndItems;
