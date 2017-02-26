'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';

const { stone, sun, sand } = Colors;

const Container = styled.div`
  flex: 1 1 auto;
  max-width: 38em;
  min-width: 15em;
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
    const { name, children, className } = this.props;
    let short = false;
    if (children == null) { return null }
    if (typeof children == 'string') {
      if (children.length == 0) { return null}
      if (children.length < 30) {
        short = true;
      }
    }
    if (short) {
      return (
        <Short className={className}>
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
        <Long className={className}>
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
