'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'common/colors';
import Fonts from 'common/fonts';
import CommonButton from 'common/button';

const { textShadow } = Colors;
const leftAnim = `left .15s ease-in-out`;
const easing = `cubic-bezier(0.730, -0.300, 0.375, 1.360)`;
const delay = ({state, isTitle}) => {
  if (isTitle) {
    if (state == 'hidden') return 0.1;
    else if (state == 'closed') return 0.5;
  }
  if (state == 'open') return 0.2;
  return 0;
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 1.8em;
  text-align: left;
  float: right;
  padding-left: .5em;
  transition: width .3s ${easing} ${delay}s, ${leftAnim};
`
const Button = styled.div`
  font: ${Fonts.h1};
  color: white;
  pointer-events: auto;
  position: relative;
  white-space: nowrap;
  text-shadow: ${textShadow};
  cursor: pointer;
  padding: .8em 0.8em .5em 1em;
  margin: -.5em;
  left: 0;
  display: inline-block;
  overflow: visible;
  width: auto;
  font-weight: bold;
  &focus: {
    outline: 1px solid white;
  }
`

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
    this.label = null;
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateWidth();
  }
  updateWidth() {
    if (this.label) {
      let {scrollWidth, innerText} = this.label;
      if (scrollWidth != this.state.width) {
        this.setState({width: scrollWidth});
      }
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWidth.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this));
  }
  mouseEnter() {
    this.props.onMouseEnter(this.props.index);
  }
  mouseLeave() {
    this.props.onMouseLeave(this.props.index);
  }
  click() {
    this.mouseLeave();
    this.props.onClick();
  }
  render() {
    const { on, menuState, isHovering, isToggling, text, isTitle } = this.props;
    const { width } = this.state;
    let style = {
      width: 0,
      left: 0
    }
    if (on) {
      style.width = width;
      if (isToggling) {
        style.left = 10;
      }
      else if (isHovering) {
        style.left = -10;
      }
    }
    return (
      <Container style={style} state={menuState} isTitle={isTitle}>
        <Button  innerRef={e => this.label = e}
                 onClick={this.click.bind(this)}
                 onMouseEnter={this.mouseEnter.bind(this)}
                 onMouseLeave={this.mouseLeave.bind(this)}
                 onTouchMove={this.mouseLeave.bind(this)}>
          {text}
        </Button>
      </Container>
    )
  }
}

export default Label;
