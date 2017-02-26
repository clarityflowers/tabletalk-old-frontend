'use strict'

import React from 'react'
import styled from 'styled-components'

import Fonts from 'blades/common/fonts';
import Colors from 'blades/common/colors';
import { darken, lighten } from 'utils/color-tools';
import cz from 'utils/styled-classes';
import CommonButton from 'common/button';
import connect from 'utils/connect';

const { body } = Fonts;
const { sun, stone, fire, sand, textShadow } = Colors;

const Container = ({order, ...rest}) => (<div style={{order}} {...rest}/>);
const Button = styled(cz(CommonButton, ['checked', 'unlocked']))`
  font: ${body};
  font-weight: 500;
  font-size: .8em;
  color: ${darken(stone, 0.05)};
  margin-right: .4em;
  transition: color .15s, text-shadow .15s;
  &.checked {
    font-weight: 700;
    color: ${sun};
    text-shadow: ${textShadow}
  }
  &.unlocked {
    color: ${sand};
    &:not(:disabled) {
      &:focus {
        text-decoration: underline;
      }
      &:hover {
        color: ${fire};
      }
      &:active {
        color: ${lighten(fire, 0.3)};
      }
    }
  }
`
const Paren = styled.span`
  font-weight: 300;
  margin-left: .3em;
`

class Upgrade extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { dispatch, name } = this.props;
    dispatch('add_upgrade', name);
  }
  render() {
    const {
      name, max, value, cost,
      rigging, stress, trauma,
      available, disabled, order
    } = this.props;
    let display = [name];
    let paren = [];
    let x2 = null;
    if (stress) {
      paren.push(`+1 stress box`);
    }
    if (trauma) {
      paren.push(`+1 trauma box`);
    }
    if (rigging) {
      paren.push(`2 free load of ${rigging[0]} or ${rigging[1]}`);
    }
    if (cost > 1 && !value) {
      paren.push(`costs ${cost}`);
    }
    if (paren.length > 0) {
      display.push(
        <Paren key='p'>({paren.join(", ")})</Paren>
      );
    }
    let firstUnlocked = available >= cost && !value;
    let secondUnlocked = available >= cost && value == 1;
    if (max > 1) {
      x2 = (
        <Button unlocked={secondUnlocked} checked={value > 1}
                disabled={!secondUnlocked || disabled}
                onClick={this.handleClick}>
          x2
        </Button>
      )
    }
    return (
      <Container order={value ? order : order + 10}>
        <Button unlocked={firstUnlocked} checked={value}
                disabled={!firstUnlocked || disabled}
                onClick={this.handleClick}>
          {display}
        </Button>
        {x2}
      </Container>
    )
  }
}

const { string, array, number, bool, func } = React.PropTypes;
Upgrade.propTypes = {
  name: string.isRequired,
  max: number,
  value: number.isRequired,
  cost: number,
  rigging: array,
  stress: bool,
  trauma: bool,
  available: number.isRequired,
  disabled: bool.isRequired,
  order: number.isRequired,
  dispatch: func.isRequired
}
Upgrade.defaultProps = {
  max: 1,
  cost: 1
}

export default connect(Upgrade)
