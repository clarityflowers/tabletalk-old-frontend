'use strict'

import React from 'react';
import cx from 'classnames';

import Clock  from 'games/blades-in-the-dark/window/common/clock.js';
import { Tick } from 'games/blades-in-the-dark/window/common/tick.js';

import './armor-and-healing.scss';

const Tickbar = (props) => {
  const { name, checked, update, disabled, children } = props;
  const handleClick = () => { update(!checked); }
  const className = cx('tickbar', name);
  return (
    <button className={className} onClick={handleClick.bind(this)}
            disabled={disabled}>
      <div className='container'>
        <div className='label'>
          {children}
        </div>
        <Tick checked={checked} isButton={false}/>
      </div>
    </button>
  )
}

Tickbar.propTypes = {
  name: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

const ArmorTickBar = (props) => {
  const { name } = props;
  return (
    <Tickbar {...props}>
      {name.toUpperCase()}
    </Tickbar>
  );
}


const Healing = (props) => {
  const { clock, unlocked, disabled, update } = props;
  const updateUnlocked = (unlocked) => { update({unlocked}); }
  const increment = () => {
    if (clock < 8) {
      update({clock: clock + 1})
    }
  }
  const decrement = () => {
    if (clock > 0) {
      update({clock: clock - 1});
    }
  }
  const className = cx('clock', {unlocked});
  return (
    <div className='healing' ref='REF'>
      <div className={className}>
        <Clock value={clock} size={8} disabled={!unlocked || disabled}
          increment={increment.bind(this)}
          decrement={decrement.bind(this)}/>
      </div>
      <Tickbar name='healing-tickbar' checked={unlocked} disabled={disabled}
               update={updateUnlocked.bind(this)}>
        HEALING
      </Tickbar>
    </div>
  )
}

Healing.propTypes = {
  clock: React.PropTypes.number.isRequired,
  unlocked: React.PropTypes.bool.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  update: React.PropTypes.func.isRequired
}

const Armor = (props) => {
  const { normal, heavy, special, update, disabled } = props;
  const updateNormal = (used) => { update({normal: used}); };
  const updateHeavy = (used) => { update({heavy: used}); };
  let specialArmors = [];
  const keys = Object.keys(special);
  for (let i=0; i < keys.length; i++) {
    const key = keys[i];
    const specialArmor = special[key];
    const updateSpecial = (used) => {
      update({special: {[key]: {used: used}}});
    };
    specialArmors.push(
      <div className='row' key={key}>
        <ArmorTickBar name={specialArmor.name} checked={specialArmor.used} disabled={disabled}
                      update={updateSpecial.bind(this)}/>
      </div>
    )
  }
  return (
    <div className='armor'>
      <div className='row'>
        <ArmorTickBar name='armor' checked={normal} disabled={disabled}
                      update={updateNormal.bind(this)}/>
        <ArmorTickBar name='heavy' checked={heavy} disabled={disabled}
                      update={updateHeavy.bind(this)}/>
      </div>
      {specialArmors}
    </div>
  )
}

Armor.PropTypes = {
  normal: React.PropTypes.bool.isRequired,
  heavy: React.PropTypes.bool.isRequired,
  special: React.PropTypes.object.isRequired,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

const ArmorAndHealing = (props) => {
  const { armor, healing, updateHealing, updateArmor, disabled } = props;
  return (
    <div className='armor-and-healing'>
      <Armor {...armor} update={updateArmor} disabled={disabled}/>
      <Healing {...healing} update={updateHealing} disabled={disabled}/>
    </div>
  )
}

ArmorAndHealing.PropTypes = {
  healing: React.PropTypes.object.isRequired,
  armor: React.PropTypes.object.isRequired,
  updateHealing: React.PropTypes.func.isRequired,
  updateArmor: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default ArmorAndHealing;
