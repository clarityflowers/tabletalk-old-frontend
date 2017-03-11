'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import { darken, fadeout } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { stone, fire } = Colors;

const Container = styled(cz('div', ['left', 'right']))`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 1em);
  height: calc(100% - 1em);
  flex: 1 1 auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overflow-x: hidden;
  margin: .5em .5em .5em .5em;
  padding: .5em .5em 2.5em .5em;
  transition: left .15s ease-in-out;
  &::-webkit-scrollbar-thumb {
    background: ${darken(stone, 0.2)};
    &:hover {
      background: ${fadeout(fire, 0.5)};
    }
  }
  &.left, &.right {
    &::-webkit-scrollbar-thumb {
      background: ${stone};
    }
  }
  &.left {
    left: -100%;
  }
  &.right {
    left: 100%;
  }
`

class Portal extends React.PureComponent {
  render() {
    const { children, left, right } = this.props;
    return (
      <Container left={left} right={right}>
        {children}
      </Container>
    );
  }
}

export default Portal;
