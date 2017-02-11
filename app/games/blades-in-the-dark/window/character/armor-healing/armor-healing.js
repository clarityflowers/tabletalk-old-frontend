'use strict'

import React from 'react';
import styled from 'styled-components';

import Armor from './armor';
import Healing from './healing';

import Colors from 'games/blades-in-the-dark/common/colors';

const { sun, shadow} = Colors;

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: space-between;
  width: 6em;
  max-width: 9em;
  position: relative;
  padding-left: .5em;
  box-sizing: border-box;
  z-index: 0;
  align-self: stretch;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    box-sizing: border-box;
    width: .5em;
    background: ${sun};
    z-index: 11;
    box-shadow: ${shadow};
  }
`

class ArmorHealing extends React.PureComponent {
  render() {
    const {
      armorUsed, armorAvailable, heavyUsed, heavyAvailable, specialUsed,
      healingClock, healingUnlocked, vigor,
      disabled
    } = this.props;
    const armor = {
      used: armorUsed, available: armorAvailable,
      heavyUsed, heavyAvailable, specialUsed
    }
    const healing = {clock: healingClock, unlocked: healingUnlocked, vigor};
    return (
      <Container>
        <Armor {...armor} disabled={disabled}/>
        <Healing {...healing} disabled={disabled}/>
      </Container>
    )
  }
}

const { bool, number } = React.PropTypes;
ArmorHealing.PropTypes = {
  armorUsed: bool.isRequired,
  armorAvailable: bool.isRequired,
  heavyUsed: bool.isRequired,
  heavyAvailable: bool.isRequired,
  specialUsed: bool.isRequired,
  healingClock: number.isRequired,
  healingUnlocked: bool.isRequired
}

export default ArmorHealing;
