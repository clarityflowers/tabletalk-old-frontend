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
  const { playbook, specialAbilities } = props;
  let abilities = [];
  for (let i=0; i < specialAbilities.length; i++) {
    const ability = specialAbilities[i];
    abilities.push(
      <Ability key={i} {...ability}/>
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
