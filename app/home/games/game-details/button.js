import React from 'react';
import rx from 'resplendence';

import CommonButton from 'common/button';
import Link from 'utils/link';
import { HoverWiggle } from 'utils/hover-animate';

rx`
@import "~common/colors";
@import "~common/fonts";
$active: lighten($hearts, 15%);

@mixin common {
  text-decoration: none;
  background-color: $hearts;
  box-shadow: $boxShadow;
  color: $heartsLight;
  padding: .5em .5em .2em .5em;
  border: none;
  font-family: $h1;
  font-size: 1em;
  cursor: pointer;
  &:focus {
    text-decoration: underline;
    outline: none;
  }
  &:active {
    background: $active;
  }
}
`

const Enter = rx(Link)`--1
  @include common;
`
const Join = rx(CommonButton)`--1
  @include common;
`
const Wiggle = rx(HoverWiggle)`--1
  display: inline-block;
  width: auto;
`

class Button extends React.Component {
  render() {
    const { route, onJoin, present } = this.props;
    let button = null;
    if (present) {
      button = (
        <Enter route={route.push('go')}>Enter</Enter>
      );
    }
    else {
      button = (
        <Join onClick={onJoin}>Join</Join>
      );
    }
    return (
      <Wiggle>
        {button}
      </Wiggle>
    );
  }
}

const { object, func, bool } = React.PropTypes;
Button.propTypes = {
  route: object.isRequired,
  onJoin: func.isRequired,
  present: bool.isRequired
}

export default Button;
