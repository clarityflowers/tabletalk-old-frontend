
'use strict'

import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Sheet from './sheet/sheet';
import NewAbility from 'blades/window/common/pages/new-ability/new-ability';


const Container = styled.div`
  width: 100%;
  height: 100%;
`

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  shouldComponentUpdate(newProps) {
    if (
      newProps.character !== this.props.character || (
        newProps.active &&
        !newProps.route.equals(this.props.route)
      ) ||
      newProps.library !== this.props.library
    ) {
      return true;
    }
    return false;
  }
  update (action, value) {
    const data = {
      id: this.props.id,
      action: action
    };
    if (value != undefined) {
      data.value = value;
    }
    this.props.send(data);
  }
  render() {
    const {
      character,
      me, library,
      route
    } = this.props;
    const {
      editPermission, viewPermission, playbookXP, abilities, playbook
    } = character;
    const disabled = !editPermission.includes(me.id);

    let portal = 'sheet';
    if (!route.isExact) {
      if (
        route.nextName == 'new_ability' &&
        !disabled &&
        playbookXP >= 8
      ) {
        portal = 'new_ability';
      }
    }
    const nextRoute = route.push(portal);


    const sheetProps = {
      character,
      me, library,
      route, disabled,
      off: portal != 'sheet'
    }
    const abilityProps = {
      abilities, playbook,
      library: library.abilities,
      off: portal != 'new_ability',
      route: nextRoute
    }

    return (
      <Container>
        <Sheet {...sheetProps}/>
        <NewAbility {...abilityProps}/>
      </Container>
    )
  }
};

const { number, string, array, bool, object } = React.PropTypes
Character.propTypes = {
  character: object.isRequired,
  me: object.isRequired,
  library: object.isRequired
}

export default Character;
