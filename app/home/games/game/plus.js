'use strict';

import React from 'react';
import rx from 'resplendence';

import { HoverWiggle } from 'utils/hover-animate.js';

rx`
@import "~common/colors";
`

const Container = rx('div')`
  pointer-events: auto;
  position: absolute;
  left: 4em;
  top: 2.6em;
  width: 0;
  height: 0;
  display: inline-block;
  flex: none;
  transition-property: left;
  transition-duration: .7s;
  transition-timing-function: cubic-bezier(0.730, -0.300, 0.375, 1.360);
  &.off {
    left: -50vw;
  }
`
const Component = rx('div')`
  position: absolute;
  transition-duration: .7s;
  transition-timing-function: cubic-bezier(0.730, -1, 0.375, 2);
`
const Fix = rx(Component)`
  background: $hearts;
`
const Dot = rx(Fix)`
  width: 2em;
  height: 2em;
  top: -1em;
  left: -1em;
  border-radius: 3.0em;
  z-index: 5;
  transition-property: height, top, width, left;
  &.off {
    height: 0;
    width: 0;
    top: 0;
    left: 0;
  }
`
const Bar = rx(Component)`
  box-shadow: 0px 0px 2px 1px $shadowColor;
  background: $shadowColor;
  &:before {
    content: '';
    position: absolute;
    background: $hearts;
    transition-duration: .7s;
    transform: translate(2px, -2px);
    transition-timing-function: cubic-bezier(0.730, -1, 0.375, 2);
  }
`
rx`
@mixin vertical-dimensions {
  width: 1.6em;
  height: 4.8em;
  top: -2.4em;
  left: -0.8em;
}
`
const Vertical = rx(Bar)`
  @include vertical-dimensions;
  transform: translate(-2px, 2px);
  z-index: 2;
  &:before {
    width: 1.6em;
    height: 4.8em;
  }
  transition-property: height, top, box-shadow;
  &.off {
    height: 0;
    top: 0;
    box-shadow: none;
    &:before {
      height: 0;
    }
  }
`
const Horizontal = rx(Bar)`
  left: -2.4em;
  top: -0.8em;
  width: 4.8em;
  height: 1.6em;
  z-index: 3;
  transform: translate(-2px, 2px);
  &:before {
    width: 4.8em;
    height: 1.6em;
  }
  transition-property: width, left, box-shadow;
  &.off {
    width: 0;
    left: 0;
    box-shadow: none;
    &:before {
      width: 0;
    }
  }
`
const ShadowFix = rx(Fix)`  
  @include vertical-dimensions;
  transition-property: height, top, box-shadow;
  z-index: 4;
  &.off {
    height: 0;
    top: 0;
  }
`
const DotShadow = rx(Component)`
  width: 2em;
  height: 2em;
  top: -1em;
  left: -1em;
  border-radius: 3.0em;
  z-index: 1;
  transform: translate(-2px, 2px);
  background-color: $shadowColor;
  transition-property: height, top, width, left, box-shadow;
  &.off {
    box-shadow: none;
    height: 0;
    width: 0;
    top: 0;
    left: 0;
  }
`

let Plus = (props) => {
  const { position } = props;
  const off = position <= 1;
  return(
    <Container className='plus' rx={{off: position == 0}}>
      <HoverWiggle rx={{off: position < 2}}>
        <Dot rx={{off: position > 1}}/>
        <Vertical rx={{off}}/>
        <Horizontal rx={{off}}/>
        <ShadowFix rx={{off}}/>
        <DotShadow rx={{off: position > 1}}/>
      </HoverWiggle>
    </Container>
  )
}

const { number } = React.PropTypes;
Plus.PropTypes = {
  position: number.isRequired
}

export default Plus;
