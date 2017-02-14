'use strict'

import React from 'react';
import styled from 'styled-components';

import CommonButton from 'common/button';
import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { lighten, darken } from 'utils/color-tools';
import { HoverWiggle } from 'utils/hover-animate.js';
import props from 'utils/props';
import cz from 'utils/styled-classes';

const Container = styled(cz('div', 'off'))`
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
const focus = lighten(Colors.fire, 0.2);
const Button = styled(CommonButton)`
  margin: .5em;
  color: ${Colors.sun};
  background-color: ${Colors.fire};
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
    border: .1em solid ${Colors.stone};
    padding-top: .15em
  }
  &:hover {
    background-color: ${Colors.sand};
  }
  &:active {
    background-color: ${Colors.sky};
  }
`
const ToggleButton = styled(Button)`
  z-index: 11;
  font: ${Fonts.icon};
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
    <Container off={off}>
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
