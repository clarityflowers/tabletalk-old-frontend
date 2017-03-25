'use strict'

import React from 'react';
import styled, { css }  from 'styled-components';

import Self from './self';
import Veteran from './veteran';

import connect from 'utils/connect';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

class NewAbility extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  shouldComponentUpdate(newProps) {
    if (
      this.props.abilities !== newProps.abilities ||
      this.props.playbook !== newProps.playbook ||
      this.props.library !== newProps.library ||
      this.props.off !== newProps.off ||
      this.props.crew !== newProps.crew ||
      !this.props.route.equals(newProps.route)
    ) {
      return true;
    }
    return false;
  }
  handleAdd(name) {
    const { dispatch, route, library, playbook } = this.props;
    const pb = library.playbook[playbook];
    const result = {name, veteran: false};
    if (pb) {
      if (!pb.includes(name)) {
        result.veteran = true;
      }
    }
    dispatch('add_ability', result);
    route.pop().replace();
  }
  render() {
    const {
      abilities, playbook, library, off, route, crew
    } = this.props;
    let next = null;
    let nextName = null;
    if(!route.isExact) {
      next = route.next();
      nextName = next.name;
    }
    return (
      <Container>
        <Self abilities={abilities} def={library.def}
              names={library.playbook[playbook]} route={route}
              right={off} left={nextName == 'veteran'} onAdd={this.handleAdd}
              crew={crew}/>
        <Veteran abilities={abilities} playbook={playbook} library={library}
                 off={nextName != 'veteran'} onAdd={this.handleAdd}/>
      </Container>
    )
  }
}

const { array, string, object, bool } = React.PropTypes;
NewAbility.propTypes = {
  abilities: array.isRequired,
  playbook: string.isRequired,
  library: object.isRequired,
  off: bool.isRequired,
  route: object.isRequired,
  crew: bool,
}

export default connect(NewAbility);
