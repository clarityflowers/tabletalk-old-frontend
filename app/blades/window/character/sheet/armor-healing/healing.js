'use strict'

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import CommonClock  from 'blades/window/common/clock/clock';
import Tickbar from './tickbar';

import Colors from 'blades/common/colors';
import connect from 'utils/connect';
import { darken, fadeout, lighten } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { sky, stone, sun, fire } = Colors;

const locked = lighten(stone, 0.2);

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 1em;
`
const Bar = styled(Tickbar)`
  width: 100%;
`

const Clock = styled(cz(CommonClock, 'locked'))`
  position: relative;
  z-index: 5;
  margin: .2em .2em 0 .2em;
  top: -.25em;
  font-size: 3em;
  .stroke {
    transition: stroke 1s;
  }
  .mark {
    transition: fill .2s;
    fill: ${darken(stone, 0.2)};
    &.checked {
      fill: ${sun};
    }
  }
  a:focus {
  }
  &:not(.locked) {
    .mark.highlight {
      fill: ${fadeout(sun, 0.5)};
      &.checked {
        fill: ${fire};
      }
    }
  }
  &.locked {
    .stroke {
      stroke: ${locked};
    }
    .mark.checked, .center {
      fill: ${locked};
    }
  }
`

class Healing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.unlock = this.unlock.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  unlock(value) {
    const { dispatch } = this.props;
    dispatch('unlock_healing', value);
  }
  increment() {
    const { dispatch } = this.props;
    dispatch('increment_healing');
  }
  decrement() {
    const { dispatch, clock } = this.props;
    if (clock > 0) {
      dispatch('decrement_healing');
    }
  }
  render() {
    const { clock, unlocked, disabled, vigor } = this.props;
    const updateUnlocked = (unlocked) => { update({unlocked}); }
    return (
      <Container>
        <Bar name='healing-tickbar' checked={unlocked} disabled={disabled}
             use={this.unlock}>
          HEALING
        </Bar>
        <Clock value={clock} size={4} disabled={!unlocked || disabled}
               locked={!unlocked} lock={vigor ? 1 : 0}
               increment={this.increment}
               decrement={this.decrement}/>
      </Container>
    );
  }
}

const { number, bool, func } = React.PropTypes;
Healing.propTypes = {
  clock: number.isRequired,
  unlocked: bool.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Healing);
