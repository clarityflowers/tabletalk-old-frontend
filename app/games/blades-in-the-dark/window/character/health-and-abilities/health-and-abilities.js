'use strict'

import React from 'react';
import cx from 'classnames';

import StressAndTrauma from './stress-and-trauma/stress-and-trauma.js';
import Harm from './harm/harm.js';
import ArmorAndHealing from './armor-and-healing/armor-and-healing.js';
import SpecialAbilities from './special-abilities/special-abilities.js'
import Details from './details.js';

import './health-and-abilities.scss';

const HealthAndAbilities = (props) => {
  const {
    stress, harm, healing, armor, specialAbilities, playbook,
    strangeFriends, details,
    disabled
  } = props;
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
  let moveArmor = [];
  const updateHealing = (healing) => { update({healing}); }
  const updateArmor = (armor) => { update({armor}); }
  return (
    <div className='health-and-abilities'>
      <div className='column stress'>
        <StressAndTrauma {...stress} disabled={disabled}/>
        <Harm {...harm} disabled={disabled}/>
      </div>
      <div className='column armor'>
        <ArmorAndHealing armor={armor} healing={healing} disabled={disabled}/>
      </div>
      <SpecialAbilities specialAbilities={specialAbilities} playbook={playbook}/>
      <Details strangeFriends={strangeFriends} {...details}/>
    </div>
  )
}

HealthAndAbilities.propTypes = {
  stress: React.PropTypes.object.isRequired,
  healing: React.PropTypes.object.isRequired,
  harm: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  specialAbilities: React.PropTypes.array.isRequired,
  strangeFriends: React.PropTypes.array.isRequired,
  details: React.PropTypes.object.isRequired,
  playbook: React.PropTypes.string,
  disabled: React.PropTypes.bool.isRequired
}

export default HealthAndAbilities;
