'use strict'

import React from 'react';
import cx from 'classnames';

import Harm from './harm.js';
import ArmorAndHealing from './armor-and-healing.js';

import './harm-and-armor.scss';

const HarmAndArmor = (props) => {
  const {
    harm, healing, armor,
    updateHarm, updateHealing, updateArmor,
    disabled
  } = props;
  return (
    <div className='harm-and-armor'>
      <Harm {...harm} update={updateHarm} disabled={disabled}/>
      <ArmorAndHealing armor={armor} updateArmor={updateArmor}
                       healing={healing} updateHealing={updateHealing}
                       disabled={disabled}/>
    </div>
  );
}

HarmAndArmor.propTypes = {
  harm: React.PropTypes.object.isRequired,
  healing: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  updateHarm: React.PropTypes.func.isRequired,
  updateHealing: React.PropTypes.func.isRequired,
  updateArmor: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default HarmAndArmor;
