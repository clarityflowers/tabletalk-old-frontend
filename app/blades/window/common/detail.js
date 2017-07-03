'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  flex: 1 1 auto;
  max-width: 38em;
  min-width: 15em;
  margin: 1em 1em 0 1em;
  align-self: flex-start;
  * {
    &::selection {
      background: $sun;
      color: $stone;
    }
  }
`
const Long = rx(Container)`
  order: 2;
`
const Short = rx(Container)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`
const Header = rx('div')`
  color: $sand;
  margin-right: 0.5em;
`
const Body = rx('div')`
  cursor: auto;
  user-select: text;
  font: $body;
  font-size: 0.8em;
  color: $sun;
`

class Detail extends React.PureComponent {
  render() {
    const { name, children, className, alwaysShow } = this.props;
    let short = false;
    if (children == null && !alwaysShow) { return null }
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

const { string, bool } = React.PropTypes;
Detail.propTypes = {
  name: string.isRequired,
  alwaysShow: bool
}

export default Detail;
