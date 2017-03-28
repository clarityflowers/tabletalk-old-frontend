'use strict'

import React from 'react';
import styled from 'styled-components';

import Ability from './ability';
import NewAbilityLink from 'blades/window/styles/new-ability-link';

import arraysEqual from 'utils/arrays-equal';
import Colors from 'blades/common/colors';
import {
  SPECIAL_ABILITIES, PLAYBOOK_ABILITIES
} from 'blades/window/character/data/special-abilities.js';

const { sun, stone } = Colors;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
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

const List = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
`

class Abilities extends React.Component {
  shouldComponentUpdate(newProps) {
    if (
      !arraysEqual(newProps.abilities, this.props.abilities) ||
      newProps.def !== this.props.def ||
      newProps.disabled !== this.props.disabled ||
      Object.keys(newProps).length !== Object.keys(this.props).length
    ) {
      return true;
    }
    return false;
  }
  render() {
    const { abilities, def, route, disabled, ...rest } = this.props;
    let list = [];
    for (let i=0; i < abilities.length; i++) {
      const name = abilities[i];
      let ability = def[name];
      if (!ability) {
        ability = {};
      }
      ability.name = name;
      list.push(
        <Ability key={i} {...ability}/>
      );
    }
    return (
      <Container {...rest}>
        {list}
        <NewAbilityLink route={route.push('new_ability')} disabled={disabled}>New Ability</NewAbilityLink>
      </Container>
    )
  }
}

const { string, array, object, bool } = React.PropTypes;
Abilities.propTypes = {
  abilities: array.isRequired,
  def: object.isRequired,
  route: object.isRequired,
  disabled: bool.isRequired,
}

export default Abilities;
