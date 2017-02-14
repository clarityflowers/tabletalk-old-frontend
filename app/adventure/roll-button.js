'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'adventure/colors';
import Fonts from 'adventure/fonts';
import { bonusString } from 'adventure/utils.js';
import { HoverWiggle } from 'utils/hover-animate';

import CommonButton from 'common/button';

const { fireworth, coldBreath, necessita, shadow } = Colors;

const Button = styled(CommonButton)`
  margin: .5em;
  font: ${Fonts.h1};
  color: ${fireworth};
  background-color: ${coldBreath};
  box-shadow: ${shadow};
  border: none;
  font-size: 25px;
  padding: .2em .6em 0 .6em;
  &:active {
    background-color: ${fireworth};
    color: ${coldBreath};
  }
`

class RollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick() {
    this.props.onChat(`/roll ${bonusString(this.props.bonus)}`)
  }
  render () {
    return (
      <HoverWiggle>
        <Button Click={this.handleClick.bind(this)}>
          Roll {bonusString(this.props.bonus)}
        </Button>
      </HoverWiggle>
    )
  }
}

export default RollButton;
