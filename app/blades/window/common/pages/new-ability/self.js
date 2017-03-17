'use strict'

import React from 'react';
import styled, { css }  from 'styled-components';

import Container from './container';
import List from './list';
import Link from './link';

import listAbilities from './list-abilities';

import Portal from 'blades/window/common/portal';
import Title from 'blades/common/components/title';
import Ability from 'blades/window/common/abilities/ability';
import CommonButton from 'common/button';
import CommonLink from 'utils/link';

import Colors from 'blades/common/colors';

const { sun, sand, fire } = Colors;

class Self extends React.PureComponent {
  render() {
    const {
      abilities, names, def, route, left, right, onAdd, crew
    } = this.props;
    const abilityList = listAbilities(names, abilities, def, onAdd);
    const maxVeteran = crew ? 2 : 3;
    let veteran = 0;
    for (let i=0; i < abilities.length; i++) {
      const ability = abilities[i];
      if (ability.veteran) {
        veteran++;
      }
    }
    if (veteran < maxVeteran) {
      abilityList.push(
        <Link key={`v${veteran}`} route={route.push('veteran')}>
          <Ability name={'Veteran'}
                   description={`Choose a special ability from another ${crew ? 'crew' : 'playbook'}. _${maxVeteran - veteran} more available._`}/>
        </Link>
      )
    }
    return (
      <Portal left={left} right={right}>
        <Container>
          <Title name="New Ability"/>
          <List>
            {abilityList}
          </List>
        </Container>
      </Portal>
    )
  }
}

const { array, object, bool, func, crew } = React.PropTypes;
Self.propTypes = {
  abilities: array.isRequired,
  def: object.isRequired,
  route: object.isRequired,
  left: bool.isRequired,
  right: bool.isRequired,
  onAdd: func.isRequired,
  crew: bool
}

export default Self;
