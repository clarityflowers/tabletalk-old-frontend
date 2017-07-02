'use strict'

import React from 'react';
import rx from 'resplendence';

import { bonusString } from 'adventure/utils.js';
import { HoverWiggle } from 'utils/hover-animate';

import CommonButton from 'common/button';

rx`
@import "~adventure/colors";
@import "~adventure/fonts";
`

const Button = rx(CommonButton)`--1
  margin: .5em;
  font: $h1;
  color: $fireworth;
  background-color: $cold-breath;
  box-shadow: $shadow;
  border: none;
  font-size: 25px;
  padding: .2em .6em 0 .6em;
  &:active {
    background-color: $fireworth;
    color: $cold-breath;
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
        <Button onClick={this.handleClick.bind(this)}>
          Roll {bonusString(this.props.bonus)}
        </Button>
      </HoverWiggle>
    )
  }
}

export default RollButton;
