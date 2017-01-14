'use strict'

import React from 'react';
import cx from 'classnames';

import StressAndTrauma from './stress-and-trauma/stress-and-trauma.js';
import HarmAndArmor from './harm-and-armor/harm-and-armor.js';

import './health-and-items.scss';

const HealthAndItems = (props) => {
  const { stress, trauma, harm, healing, armor, update, disabled } = props;
  const updateStressAndTrauma = ({stress, trauma}) => {
    let result = {};
    if (stress != undefined) { result.stress = stress; }
    if (trauma != undefined) { result.trauma = trauma; }
    update(result);
  }
  const updateHarm = (harm, hurt) => {
    if (hurt) {
      update({harm, healing: {unlocked: false}});
    }
    else {
      update({harm});
    }
  }
  const updateHealing = (healing) => { update({healing}); }
  const updateArmor = (armor) => { update({armor}); }
  return (
    <div className='health-and-items'>
      <StressAndTrauma stress={stress} trauma={trauma}
                       update={updateStressAndTrauma.bind(this)}
                       disabled={disabled}/>
      <HarmAndArmor harm={harm} healing={healing} armor={armor}
                    updateHarm={updateHarm.bind(this)}
                    updateHealing={updateHealing.bind(this)}
                    updateArmor={updateArmor.bind(this)}
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
