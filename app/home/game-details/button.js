import React from 'react';
import styled, { css } from 'styled-components';

import Colors from 'common/colors';
import { lighten } from 'utils/color-tools';
import Fonts from 'common/fonts';
import CommonButton from 'common/button';
import Link from 'utils/link';
import { HoverWiggle } from 'utils/hover-animate';

const { hearts, heartsLight, boxShadow, balloons } = Colors;

const active = lighten(hearts, 0.15);
const commonStyle = css`
  text-decoration: none;
  background-color: ${hearts};
  box-shadow: ${boxShadow};
  color: ${heartsLight};
  padding: .5em .5em .2em .5em;
  border: none;
  font-family: ${Fonts.h1};
  font-size: 1em;
  cursor: pointer;
  &:focus {
    text-decoration: underline;
    outline: none;
  }
  &:active {
    background: ${active};
  }
`
const Enter = styled(Link)`
  ${commonStyle}
`
const Join = styled(CommonButton)`
  ${commonStyle}
`
const Wiggle = styled(HoverWiggle)`
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
