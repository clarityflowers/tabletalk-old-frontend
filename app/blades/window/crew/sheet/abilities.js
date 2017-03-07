'use strict'

import React from 'react';
import styled from 'styled-components';

import CommonDetail from 'blades/window/common/detail';
import CommonAbilities from 'blades/window/common/abilities/abilities';
import XP from 'blades/window/common/xp';
import Link from 'utils/link';

import Colors from 'blades/common/colors';
import { lighten, darken } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { fire, sand, stone, textShadow } = Colors;

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
  font-size: 0.8em;
  margin-top: 0.5em;
`
const Add = styled(cz(Link, 'disabled'))`
  align-self: center;
  color: ${darken(stone, 0.1)};
  transition: color .15s, text-shadow .15s;
  margin-top: .5em;
  &:not(.disabled) {
    text-shadow: ${textShadow};
    color: ${sand};
    &:hover {
      color: ${fire};
    }
    &:active {
      color: ${lighten(fire, 0.3)};
    }
  }
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
    return (
      <Container>
        <XP name="Crew XP" value={xp} length={8}
          increment={this.increment} decrement={this.decrement}
          disabled={disabled}/>
        <StyledAbilities specialAbilities={abilities} def={library}/>
        <Add route={route.push('new_ability')} disabled={available < 2}>New Ability</Add>
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
