'use strict'

import React from 'react';
import cx from 'classnames';

import Clock  from 'games/blades-in-the-dark/window/common/clock.js';
import { Tick } from 'games/blades-in-the-dark/window/common/tick.js';

import './armor-and-healing.scss';

const Tickbar = (props) => {
  const { name, className, checked, use, disabled, children } = props;
  const handleClick = () => { use(!checked); }
  const buttonClassName = cx('tickbar', name, className);
  return (
    <button className={buttonClassName} onClick={handleClick.bind(this)}
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
  use: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

const ArmorTickBar = (props) => {
  const { name, used, available, disabled } = props;
  let properties = Object.assign({
    checked: used,
  }, props);
  delete properties.used;
  delete properties.available;
  properties.disabled = disabled || !available
  properties.className = cx({available});
  return (
    <Tickbar {...properties}>
      {name.toUpperCase()}
    </Tickbar>
  );
}

ArmorTickBar.propTypes = {
  used: React.PropTypes.bool.isRequired,
  available: React.PropTypes.bool
}

ArmorTickBar.defaultProps = {
  available: true
}


const Healing = (props) => {
  const { clock, unlocked, disabled, unlock, increment, decrement } = props;
  const updateUnlocked = (unlocked) => { update({unlocked}); }
  const className = cx('clock', {unlocked});
  return (
    <div className='healing'>
      <div className={className}>
        <Clock value={clock} size={8} disabled={!unlocked || disabled}
          increment={increment}
          decrement={decrement}/>
      </div>
      <Tickbar name='healing-tickbar' checked={unlocked} disabled={disabled}
               use={unlock}>
        HEALING
      </Tickbar>
    </div>
  )
}

Healing.propTypes = {
  clock: React.PropTypes.number.isRequired,
  unlocked: React.PropTypes.bool.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  unlock: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired
}

const Armor = (props) => {
  const { armor, heavy, special, use, disabled } = props;
  let specialArmors = [];
  const makeUse = (name) => {
    return (used) => {
      use({name, used});
    };
  };
  for (let i=0; i < special.length; i++) {
    const specialArmor = special[i];
    specialArmors.push(
      <div className='row' key={i}>
        <ArmorTickBar {...specialArmor} disabled={disabled}
                      use={makeUse(specialArmor.name)}/>
      </div>
    )
  }
  return (
    <div className='armor'>
      <div className='row'>
        <ArmorTickBar name='armor' {...armor} disabled={disabled}
                      use={makeUse('armor')}/>
        <ArmorTickBar name='heavy' {...heavy} disabled={disabled}
                      use={makeUse('heavy')}/>
      </div>
      {specialArmors}
    </div>
  )
}

Armor.PropTypes = {
  armor: React.PropTypes.object.isRequired,
  heavy: React.PropTypes.object.isRequired,
  special: React.PropTypes.object.isRequired,
  use: React.PropTypes.func.isRequired,
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
