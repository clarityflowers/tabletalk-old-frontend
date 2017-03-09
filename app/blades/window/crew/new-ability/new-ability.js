'use strict'

import React from 'react';
import styled, { css }  from 'styled-components';

import Self from './self';
import Veteran from './veteran';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

class NewAbility extends React.PureComponent {
  render() {
    const {
      abilities, playbook, library, off, route
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
              right={off} left={nextName == 'veteran'}/>
        <Veteran abilities={abilities} playbook={playbook} library={library}
                 route={route} off={nextName != 'veteran'}/>
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
  route: object.isRequired
}

export default NewAbility;
