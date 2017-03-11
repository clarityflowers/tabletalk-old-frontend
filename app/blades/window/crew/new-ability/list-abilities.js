import React from 'react';
import Button from './button';
import Ability from './ability';

const listAbilities = (names, abilities, def, onAdd) => {
  const abilityList = [];
  for (let i=0; i < names.length; i++) {
    const name = names[i];
    if (!abilities.includes(name)) {
      const props = def[name];
      abilityList.push(
        <Ability key={`${i}`} name={name} onAdd={onAdd} {...props}/>
      );
    }
  }
  return abilityList;
}

export default listAbilities;
