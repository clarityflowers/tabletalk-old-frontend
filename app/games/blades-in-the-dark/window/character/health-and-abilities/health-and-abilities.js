'use strict'

import React from 'react';
import cx from 'classnames';

import StressAndTrauma from './stress-and-trauma/stress-and-trauma.js';
import Harm from './harm/harm.js';
import ArmorAndHealing from './armor-and-healing/armor-and-healing.js';
import SpecialAbilities from './special-abilities/special-abilities.js'
import StrangeFriends from './strange-friends.js';

import './health-and-abilities.scss';

const HealthAndItems = (props) => {
  const {
    stress, trauma, harm, healing, armor, specialAbilities, playbook,
    strangeFriends,
    update, updateSpecialAbilities, disabled
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

        <StressAndTrauma stress={stress} trauma={trauma}
                         update={updateStressAndTrauma.bind(this)}
                         disabled={disabled}/>
        <Harm {...harm} update={updateHarm.bind(this)} disabled={disabled}/>
      </div>
      <div className='column armor'>
        <ArmorAndHealing armor={armor} healing={healing} disabled={disabled}
                         updateArmor={updateArmor} updateHealing={updateHealing}/>
      </div>
      <SpecialAbilities specialAbilities={specialAbilities} playbook={playbook}/>
      <StrangeFriends strangeFriends={strangeFriends}/>
    </div>
  )
}

HealthAndItems.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  healing: React.PropTypes.object.isRequired,
  harm: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  specialAbilities: React.PropTypes.array.isRequired,
  strangeFriends: React.PropTypes.object.isRequired,
  playbook: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default HealthAndItems;
