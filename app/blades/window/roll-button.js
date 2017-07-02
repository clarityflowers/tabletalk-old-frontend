'use strict'

import React from 'react';
import rx from 'resplendence';

import CommonButton from 'common/button';
import { HoverWiggle } from 'utils/hover-animate.js';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  z-index: 9;
  position: relative;
  width: 2.5em;
  transition-property: width;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(0.730, -0.300, 0.375, 1.360);
  font-size: 1.25em;
  &.off {
    width: 0em;
  }
`
const Button = rx(CommonButton)`--1
  margin: .5em;
  color: $sun;
  background-color: $fire;
  box-sizing: border-box;
  font-family: 'League Spartan';
  padding-top: .2em;
  vertical-align: middle;
  width: 1.5em;
  height: 1.5em;
  border-radius: 1.5em;
  overflow: show;
  text-align: center;
  left: 0;
  z-index: 10;
  &:focus {
    border: .1em solid $stone;
    padding-top: .15em
  }
  &:hover {
    background-color: $sand;
  }
  &:active {
    background-color: $sky;
  }
`
const ToggleButton = rx(Button)`--1
  z-index: 11;
  font: $icon;
  padding: 0 0 0 .05em;
  width: 2em;
  height: 2em;
  margin: .25em;
  &:focus {
    padding-top: 0;
  }
`

const RollButton = (props) => {
  const { off, toggle, level, onClick } = props;
  const handleClick = () => {
    if (!off) {
      onClick(level);
    }
  }
  let Node = Button;
  let text = level;
  if (toggle) {
    Node = ToggleButton;
    text = '6';
  }
  return (
    <Container rx={{off}}>
      <HoverWiggle off={off}>
        <Node onClick={handleClick} disabled={off}>
          {text}
        </Node>
      </HoverWiggle>
    </Container>
  );
};

RollButton.propTypes = {
  off: React.PropTypes.bool,
  toggle: React.PropTypes.bool,
  level: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired
}

export default RollButton;
