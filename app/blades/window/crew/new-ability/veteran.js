'use strict'

import React from 'react';
import styled, { css }  from 'styled-components';

import Container from './container';
import List from './list';
import Button from './button';
import Link from './link';

import listAbilities from './list-abilities';

import Portal from 'blades/window/common/portal';
import Title from 'blades/common/components/title';
import Ability from 'blades/window/common/abilities/ability';
import CommonButton from 'common/button';
import CommonLink from 'utils/link';


class Veteran extends React.PureComponent {
  render() {
    const { abilities, playbook, library, route, off } = this.props;
    const abilityLists = [];
    let playbooks = Object.keys(library.playbook);
    for (let i=0; i < playbooks.length; i++) {
      let playbookName = playbooks[i];
      if (playbookName != playbook) {
        const names = library.playbook[playbookName];
        const abilityList = listAbilities(names, abilities, library.def);
        abilityLists.push(
          <Container key={i}>
            <Title name={playbookName}/>
            <List>
              {abilityList}
            </List>
          </Container>
        )
      }
    }
    return (
      <Portal right={off}>
        <Container>
          {abilityLists}
        </Container>
      </Portal>
    )
  }
}

const { array, string, object, bool } = React.PropTypes;
Veteran.propTypes = {
  abilities: array.isRequired,
  playbook: string.isRequired,
  library: object.isRequired,
  off: bool.isRequired,
  route: object.isRequired
}

export default Veteran;
