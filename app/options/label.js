'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'common/colors';
import Fonts from 'common/fonts';
import CommonButton from 'common/button';

const { textShadow } = Colors;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 1.8em;
  text-align: left;
  float: right;
  padding-left: .5em;
`
const Button = styled(CommonButton)`
  font: ${Fonts.h1};
  color: white;
  pointer-events: all;
  position: relative;
  white-space: nowrap;
  text-shadow: ${textShadow};
  cursor: pointer;
  padding: .8em (0.8em) .5em 1em;
  margin: -.5em;
  left: 0;
  display: inline-block;
  overflow: visible;
  width: auto;
  font-weight: bold;
`

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateWidth();
  }
  updateWidth() {
    let {scrollWidth, innerText} = this.refs.label;
    if (scrollWidth != this.state.width) {
      this.setState({width: scrollWidth});
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
    let style = {
      width: 0,
      left: 0
    }
    if (this.props.on) {
      style.width = this.state.width;
      if (this.props.isToggling) {
        style.left = 10;
      }
      else if (this.props.isHovering) {
        style.left = -10;
      }
    }
    return (
      <Container style={style}>
        <Button  ref='label'
                 onClick={this.click.bind(this)}
                 onMouseEnter={this.mouseEnter.bind(this)}
                 onMouseLeave={this.mouseLeave.bind(this)}
                 onTouchMove={this.mouseLeave.bind(this)}>
          {this.props.text}
        </Button>
      </Container>
    )
  }
}

export default Label;
