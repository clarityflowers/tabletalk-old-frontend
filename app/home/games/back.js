'use strict';

import React from 'react';
import rx from 'resplendence';

import CommonLink from 'utils/link.js';
import { HoverWiggle } from 'utils/hover-animate.js';

rx`
@import "~common/colors";
@import "~common/fonts";
`

const Link = rx(CommonLink)`--1
  font: $icon;
  color: $heartsLight;
  background: $hearts;
  box-shadow: $boxShadow;
  border-radius: .4em;
  padding: .2em;
  width: auto;
  height: 1em;
  text-align: center;
  text-decoration: none;
  &:focus {
    outline: none;
    background: lighten($hearts, 10%);
  }
`
const Wiggle = rx(HoverWiggle)`--1
  font-size: 2.5em;
  position: relative;
  left: .9em;
  top: 0;
  width: 1.2em;
  height: 1.2em;
  pointer-events: auto;
  transition: top .7s cubic-bezier(0.7,-0.7,0.4,1.8);
  &.off {
    top: -6em;
  }
`

class Back extends React.PureComponent
{
  render() {
    const { off, route } = this.props;
    return (
      <Wiggle off={off}>
        <Link route={route} disabled={off}>&lt;</Link>
      </Wiggle>
    );
  }
}

const { object, bool } = React.PropTypes;
Back.propTypes = {
  route: object.isRequired,
  off: bool.isRequired
}

export default Back;
