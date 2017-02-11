'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';

const { stone, sun, sand } = Colors;

const Container = styled.div`
  flex: 1 1 auto;
  max-width: 38em;
  min-width: 15em;
  width: 100%;
  margin: 1em 1em 0 1em;
  align-self: flex-start;
  * {
    &::selection {
      background: ${sun};
      color: ${stone};
    }
  }
`
const Long = styled(Container)`
  order: 2;
`
const Short = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`
const Header = styled.div`
  color: ${sand};
  margin-right: 0.5em;
`
const Body = styled.div`
  cursor: auto;
  user-select: text;
  font: ${Fonts.body};
  font-size: 0.8em;
  color: ${sun};
`

class Detail extends React.PureComponent {
  render() {
    const { name, children } = this.props;
    let short = false;
    console.log('DETAIL', name, children);
    if (children == null) { return null }
    if (typeof children == 'string') {
      if (children.length == 0) { return null}
      if (children.length < 30) {
        short = true;
      }
    }
    if (short) {
      return (
        <Short>
          <Header>
            {name.toUpperCase()}:
          </Header>
          <Body>
            {children}
          </Body>
        </Short>
      );
    }
    else {
      return (
        <Long>
          <Header>
            {name.toUpperCase()}
          </Header>
          <Body>
            {children}
          </Body>
        </Long>
      );
    }
  }
}

const { string } = React.PropTypes;
Detail.propTypes = {
  name: string.isRequired
}

export default Detail;
