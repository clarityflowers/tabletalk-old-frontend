'use strict'

import React from 'react';
import styled from 'styled-components';

import { background, color, shadow } from './colors';
import Fonts from 'blades/common/fonts';
import cz from 'utils/styled-classes';
import props from 'utils/props';

const Container = styled(props(cz('div', 'on'), 'width', 'over'))`
  font: ${Fonts.h1};
  font-size: .75em;
  padding-right: 0.2em;
  padding-left: 0;
  color: ${color};
  background: ${background}
  position: absolute;
  box-shadow: ${shadow};
  transition: opacity .3s;
  width: 0em;
  left: .75em;
  top: .1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  transition: width .25s ease-in-out,
              padding .25s ease-in-out,
              background 1s;
  overflow: hidden;
  &.on {
    width: ${p => p.width}px;
    padding-left: 1.3em;
  }
`

const Content = styled.div`

`

class Label extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
    this.updateWidth = this.updateWidth.bind(this);
  }
  updateWidth(e) {
    if (e) {
      this.setState({width: e.scrollWidth});
    }
  }
  render() {
    const { name, on, over } = this.props;
    const { width } = this.state;
    return (
      <Container className='label' width={width} on={on} over={over}>
        <div ref={this.updateWidth}>
          {name.toUpperCase()}
        </div>
      </Container>
    );
  }
}

const { string, bool } = React.PropTypes;
Label.propTypes = {
  name: string.isRequired,
  on: bool.isRequired,
  over: bool.isRequired
}

export default Label;
