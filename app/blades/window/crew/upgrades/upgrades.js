'use strict'

import React from 'react'
import styled from 'styled-components'

import Upgrade from './upgrade';
import CommonLabel from 'blades/window/styles/label';

import Fonts from 'blades/common/fonts';
import Colors from 'blades/common/colors';
import { lighten } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { h1 } = Fonts;
const { sun, stone, fire, sky } = Colors;

const Container = styled(cz('div', ['checked', 'unlocked']))`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  min-width: 8em;
  margin: .5em;
`
const Label = styled(CommonLabel)`
  margin-bottom: .2em;
`
const List = styled.div`
  margin: 0 .2em;
`

class Upgrades extends React.PureComponent {
  render() {
    const { upgrades, name, available, disabled } = this.props;
    const list = [];
    for (let i=0; i < upgrades.length; i++) {
      const upgrade = upgrades[i]
      list.push(
        <Upgrade key={i} {...upgrade} available={available} disabled={disabled}/>
      );
    }
    return (
      <Container>
        <Label>{name}</Label>
        <List>{list}</List>
      </Container>
    )
  }
}

const { array, string, number, bool } = React.PropTypes;
Upgrades.propTypes = {
  upgrades: array.isRequired,
  name: string.isRequired,
  available: number.isRequired,
  disabled: bool.isRequired
}

export default Upgrades
