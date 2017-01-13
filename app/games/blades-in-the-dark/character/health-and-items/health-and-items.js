'use strict'

import React from 'react';
import cx from 'classnames';

import StressAndTrauma from './stress-and-trauma';

import './health-and-items.scss';

const HealthAndItems = (props) => {
  const { stress, trauma, update, disabled } = props;
  const updateStressAndTrauma = ({stress, trauma}) => {
    let result = {};
    if (stress != undefined) { result.stress = stress; }
    if (trauma != undefined) { result.trauma = trauma; }
    update(result);
  }
  return (
    <div className='health-and-items'>
      <StressAndTrauma stress={stress} trauma={trauma}
                       update={updateStressAndTrauma.bind(this)}
                       disabled={disabled}/>
    </div>
  )
}

HealthAndItems.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  healing: React.PropTypes.object.isRequired,
  harm: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  equipment: React.PropTypes.object.isRequired,
  update: React.PropTypes.func.isRequired,
  updateEquipment: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

export default HealthAndItems;
