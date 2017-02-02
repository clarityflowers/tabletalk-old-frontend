'use strict';

import React from 'react';
import styled from 'styled-components';

import Colors from 'common/colors';
import Fonts from 'common/fonts';

const { heartsLight, textShadow } = Colors;

const Container = styled.div`
  pointer-events: auto;
  text-align: left;
  overflow: hidden;
  margin: 0;
  transition-property: width;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0.730, -0.300, 0.375, 1.360);
`
const Content = styled.span`
  flex: 1;
  font: ${Fonts.h1};
  font-size: 3em;
  color: ${heartsLight};
  text-shadow: ${textShadow};
  padding: .3em 0px .1em .6em;
  display: inline-block;
  white-space: nowrap;
  float: right;
  overflow: visible;
  text-decoration: none;
  width: auto;
`

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
    this.box = null;
    this.updateWidth = this.updateWidth.bind(this);
  }
  updateWidth() {
    if (this.box) {
      let {scrollWidth} = this.box;
      if (scrollWidth != this.state.width) {
        this.setState({width: scrollWidth});
      }
    }
  }
  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateWidth();
  }
  render() {
    const { position, transition, name } = this.props;
    const { width } = this.state;
    let style = {
      width: 0
    }
    if (position == 1) {
      style.width = width;
    }
    if (!transition) {
      style.transition = 'none';
    }
    return (
      <Container style={style}>
        <Content className='label' innerRef={e => this.box = e}>
          {name}
        </Content>
      </Container>
    );
  }
}

const { number, bool, string } = React.PropTypes;
Label.propTypes = {
  position: number.isRequired,
  transition: bool.isRequired,
  name: string.isRequired
}

export default Label;
