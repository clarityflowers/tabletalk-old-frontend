'use strict'

import React from 'react';
import cx from 'classnames';

import {
  SPECIAL_ABILITIES, PLAYBOOK_ABILITIES
} from 'games/blades-in-the-dark/window/character/data/special-abilities.js';


import './special-abilities.scss';

const parse = (array, ending) => {
  let result = [];
  let buffer = "";
  let char = array.pop();
  let i=0;
  while (true) {
    if (char == ending) {
      result.push(buffer);
      return result;
    }
    else if (['*', '_'].includes(char)) {
      if (buffer) {
        result.push(buffer);
        buffer = "";
      }
      const inner = parse(array, char);
      if (char == "*") {
        result.push(
          <strong key={i++}>{inner}</strong>
        );
      }
      else if (char == "_") {
        result.push(
          <em key={i++}>{inner}</em>
        );
      }
    }
    else {
      buffer += char;
    }
    char = array.pop();
  }
}

const SpecialAbility = (props) => {
  const { name } = props;
  const ability = SPECIAL_ABILITIES[name];
  let description = ability.description.split("").reverse();
  const result = parse(description);
  return (
    <p className='ability'>
        <span className='name'>{name.toUpperCase()}:</span>
        {result}
    </p>
  )
}

SpecialAbility.propTypes = {
  name: React.PropTypes.string.isRequired
}

const SpecialAbilities = (props) => {
  const { playbook } = props;
  let specialAbilities = props.specialAbilities.slice(0);
  const playbookAbilities = PLAYBOOK_ABILITIES[playbook];
  let abilities = []
  if (playbookAbilities) {
    for (let i=0; i < playbookAbilities.length; i++) {
      const name = playbookAbilities[i];
      const index = specialAbilities.indexOf(name);
      if (index >= 0) {
        specialAbilities.splice(index, 1);
        abilities.push(
          <SpecialAbility key={'p' + i} name={name}/>
        );
      }
    }
  }
  for (let i=0; i < specialAbilities.length; i++) {
    const name = specialAbilities[i];
    abilities.push(
      <SpecialAbility key={'o' + i} name={name}/>
    );
  }
  return (
    <div className='special-abilities'>
      {abilities}
    </div>
  )
}

SpecialAbilities.propTypes = {
  specialAbilities: React.PropTypes.array.isRequired,
  playbook: React.PropTypes.string
}

export default SpecialAbilities;
