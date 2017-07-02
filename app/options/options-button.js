'use strict'

import React from 'react';
import rx from 'resplendence';

import Fonts from 'common/fonts';
import CommonButton from 'common/button';

rx`
@import "~common/fonts";
`

const Button = rx(CommonButton)`--1
  padding: 0;
  border: none;
  width: 1.43em;
  height: 1.43em;
  display: inline-block;
  position: relative;
  font: $icon;
  font-size: 1.26em;
  text-align: center;
  color: white;
  background-color: transparent;
  cursor: pointer;
`

const OptionsButton = (props) => {
  let mouseEnter = () => {
    props.onMouseEnter(props.index);
  }
  let mouseLeave = () => {
    props.onMouseLeave(props.index);
  }
  let click = () => {
    mouseLeave();
    props.onClick();
  }
  const rx = {
    'anim-wiggle': props.isHovering
  };
  return (
    <Button onClick={click}
            rx={rx}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}>
      {props.glyph}
    </Button>
  )
}

export default OptionsButton;
