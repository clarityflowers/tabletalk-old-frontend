import React from 'react';
import Button from './button';
import Ability from './ability';

const listAbilities = (names, abilities, def, onAdd) => {
  const abilityList = [];
  const abilityNames = {};
  for (let i=0; i < abilities.length; i++) {
    const ability = abilities[i];
    abilityNames[ability.name] = true;
  }
  for (let i=0; i < names.length; i++) {
    const name = names[i];
    if (!abilityNames[name]) {
      const props = def[name];
      abilityList.push(
        <Ability key={`${i}`} name={name} onAdd={onAdd} {...props}/>
      );
    }
  }
  return abilityList;
}

export default listAbilities;
