'use strict'

import React from 'react';
import styled from 'styled-components';

import Ability from './ability';

import Colors from 'blades/common/colors';
import {
  SPECIAL_ABILITIES, PLAYBOOK_ABILITIES
} from 'blades/window/character/data/special-abilities.js';

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
  const { specialAbilities, def, ...rest } = props;
  let abilities = [];
  for (let i=0; i < specialAbilities.length; i++) {
    const name = specialAbilities[i];
    let ability = def[name];
    if (!ability) {
      ability = {};
    }
    ability.name = name;
    abilities.push(
      <Ability key={i} {...ability}/>
    );
  }
  return (
    <Container {...rest}>
      {abilities}
    </Container>
  )
}

const { string, array, object } = React.PropTypes;
Abilities.propTypes = {
  specialAbilities: array.isRequired,
  def: object.isRequired
}

export default Abilities;
