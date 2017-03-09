import React from 'react';
import Button from './button';
import Ability from 'blades/window/common/abilities/ability';

const listAbilities = (names, abilities, def) => {
  const abilityList = [];
  for (let i=0; i < names.length; i++) {
    const name = names[i];
    if (!abilities.includes(name)) {
      const props = def[name];
      abilityList.push(
        <Button key={`${i}`}>
          <Ability name={name} {...props}/>
        </Button>
      )
    }
  }
  return abilityList;
}

export default listAbilities;
