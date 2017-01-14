'use strict'

import React from 'react';
import cx from 'classnames';

import './armor-and-healing.scss';

const Armor = (props) {
  
}

const ArmorAndHealing = (props) => {
  const { armor, healing, updateHealing, updateArmor, disabled } = props;
  return (
    <div className='armor-and-healing'>
      <Armor {...armor} update={updateArmor} disabled={disabled}/>
    </div>
  )
}

ArmorAndHealing.PropTypes = {
  healing: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  updateHealing: React.PropTypes.func.isRequired,
  updateArmor: React.PropTypes.func.isRequired
  disabled: React.PropTypes.bool.isRequired
}

export default ArmorAndHealing;
