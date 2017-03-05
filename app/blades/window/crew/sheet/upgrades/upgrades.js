'use strict'

import React from 'react'
import styled from 'styled-components'

import Upgrade from './upgrade';
import CommonLabel from 'blades/window/styles/label';
import { Dot as CommonDot } from 'blades/window/common/dot';

import Fonts from 'blades/common/fonts';
import Colors from 'blades/common/colors';
import { lighten } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { sand, shadow } = Colors;

const Container = styled(cz('div', ['checked', 'unlocked']))`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  min-width: 8em;
  margin: .5em;
`
const Label = styled(CommonLabel)`
  margin-bottom: .2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const List = styled.div`
  margin: 0 .2em;
  display: flex;
  flex-flow: column nowrap;
`
const Dots = styled.div`
  display: flex;
  flex-flow: row nowrap
  margin-left: .3em;
`
const Dot = styled((props) => (<CommonDot checked isButton={false} {...props}/>))`
  border: ${sand};
  background: ${sand};
  box-shadow: ${shadow};
  margin-left: .2em;
`

class Upgrades extends React.PureComponent {
  render() {
    const { upgrades, name, available, showAvailable, disabled } = this.props;
    const list = [];
    let dots = null;
    let names = Object.keys(upgrades);
    for (let i=0; i < names.length; i++) {
      const name = names[i];
      const upgrade = upgrades[name]
      list.push(
        <Upgrade key={i} name={name} {...upgrade} available={available} disabled={disabled}/>
      );
    }
    if (showAvailable) {
      const array = [];
      for (let i=0; i < available; i++) {
        array.push(<Dot key={i}/>);
      }
      dots = (
        <Dots>{array}</Dots>
      )
    }
    return (
      <Container>
        <Label>{name}{dots}</Label>
        <List>{list}</List>
      </Container>
    )
  }
}

const { object, string, number, bool } = React.PropTypes;
Upgrades.propTypes = {
  upgrades: object.isRequired,
  name: string.isRequired,
  available: number.isRequired,
  showAvailable: bool,
  disabled: bool.isRequired
}

export default Upgrades
