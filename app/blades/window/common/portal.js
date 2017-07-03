'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
`

const Container = rx('div')`
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
    background: darken($stone, 20%);
    &:hover {
      background: fade-out($fire, 0.5);
    }
  }
  &.left, &.right {
    &::-webkit-scrollbar-thumb {
      background: $stone;
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
      <Container rx={{left, right}}>
        {children}
      </Container>
    );
  }
}

export default Portal;
