'use strict'

import React from 'react';
import styled from 'styled-components';

import Fonts from 'common/fonts';
import CommonButton from 'common/button';

const Button = styled(CommonButton)`
  padding: 0;
  border: none;
  width: 1.43em;
  height: 1.43em;
  display: inline-block;
  position: relative;
  font: ${Fonts.icon};
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
  let className='';
  if (props.isHovering) {
    className='anim-wiggle';
  }
  return (
    <Button onClick={click}
            className={className}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}>
      {props.glyph}
    </Button>
  )
}

export default OptionsButton;
