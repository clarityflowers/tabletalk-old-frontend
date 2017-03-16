'use strict'

import React from 'react';
import styled from 'styled-components';

import CommonDetail from 'blades/window/common/detail';
import CommonAbilities from 'blades/window/common/abilities/abilities';
import XP from 'blades/window/common/xp';

import connect from 'utils/connect';

const Container = styled.div`
  margin: .5em;
  display: flex;
  flex-flow: column nowrap;
  max-width: 30em;
  align-items: stretch;
`
const Detail = styled(CommonDetail)`
  margin: 0;
`
const StyledAbilities = styled(CommonAbilities)`
  margin-top: 0.5em;
  font-size: 0.8em;
`

class Abilities extends React.PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    const { xp, dispatch } = this.props;
    if (xp < 8) {
      dispatch('increment_xp');
    }
  }
  decrement() {
    const { xp, dispatch } = this.props;
    if (xp > 0) {
      dispatch('decrement_xp');
    }
  }
  render() {
    const { abilities, library, xp, disabled, route, available } = this.props;
    const abilityList = abilities.map((a) => a.name)
    return (
      <Container>
        <XP name="Crew XP" value={xp} length={8}
          increment={this.increment} decrement={this.decrement}
          disabled={disabled}/>
          <StyledAbilities abilities={abilityList} def={library} route={route} disabled={disabled || available < 2}/>
      </Container>
    )
  }
}

const { number, array, bool, func, object } = React.PropTypes;
Abilities.propTypes = {
  xp: number.isRequired,
  abilities: array.isRequired,
  library: object.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired,
  route: object.isRequired,
  available: number.isRequired
}

export default connect(Abilities);
