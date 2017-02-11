'use strict'

import React from 'react';
import styled from 'styled-components';

import Ability from './ability';

import Colors from 'games/blades-in-the-dark/common/colors';
import {
  SPECIAL_ABILITIES, PLAYBOOK_ABILITIES
} from 'games/blades-in-the-dark/window/character/data/special-abilities.js';

const { sun, stone } = Colors;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  max-width: 38em;
  min-width: 15em;
  color: ${sun};
  cursor: auto;
  * {
    &::selection {
      background: ${sun};
      color: ${stone};
    }
  }
`

const Abilities = (props) => {
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
          <Ability key={'p' + i} name={name}/>
        );
      }
    }
  }
  for (let i=0; i < specialAbilities.length; i++) {
    const name = specialAbilities[i];
    abilities.push(
      <Ability key={'o' + i} name={name}/>
    );
  }
  return (
    <Container>
      {abilities}
    </Container>
  )
}

Abilities.propTypes = {
  specialAbilities: React.PropTypes.array.isRequired,
  playbook: React.PropTypes.string
}

export default Abilities;
