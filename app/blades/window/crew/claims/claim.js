'use strict'

import React from 'react';
import styled from 'styled-components';

import Button from 'common/button';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { darken, lighten, mix, desaturate } from 'utils/color-tools';
import connect from 'utils/connect';
import cz from 'utils/styled-classes';
import parse from 'blades/common/parse';

const { stone, fire, sun, shadow } = Colors;
const { h1, body } = Fonts;

const available = mix(desaturate(sun, 0.6), stone, 0.9);
// const owned = darken(fire, 0.1);
const owned = sun;

const Container = styled(cz(Button, ['owned', 'available']))`
  font-size: .75em;
  padding: .5em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 8.5em;
  height: 6.5em;
  justify-content: center;
  box-shadow: ${shadow};
  z-index: 2;
  position: relative;
  user-select: none;
  color: ${lighten(stone, 0.4)};
  background: ${darken(stone, 0.1)};
  &:hover {
    background: ${darken(stone, 0.05)}
  }
  &:active {
    background: ${lighten(stone, 0.3)}
  }
  &.available {
    color: ${sun};
    background: ${available};
    &:hover {
      background: ${lighten(available, 0.1)}
    }
    &:active {
      background: ${lighten(available, 0.3)}
    }
  }
  &.owned {
    color: ${stone};
    background: ${owned};
    &:hover {
      background: ${lighten(owned, 0.1)}
    }
    &:active {
      background: ${darken(stone, 0.1)}
      color: ${sun};
    }
  }
`
const Name = styled(cz('div', 'owned'))`
  font: ${h1};
  text-align: center;
`
const Description = styled(cz('div', 'owned'))`
  font: ${body};
  font-size: .7em;
  text-align: center;
`

class Claim extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { r, c, dispatch } = this.props;
    dispatch('toggle_claim', {r, c});
    console.log('toggle', r, c);
  }
  render() {
    const { name, description, available, owned, disabled } = this.props;
    let descriptionDOM = null;
    if (description) {
      descriptionDOM = (
        <Description owned={owned}>
          {parse(description)}
        </Description>
      )
    }
    return (
      <Container owned={owned} available={available} onClick={this.handleClick}
                 disabled={disabled}>
        <Name owned={owned}>
          {name.toUpperCase()}
        </Name>
        {descriptionDOM}
      </Container>
    )
  }
}

const { string, bool, number, func } = React.PropTypes;
Claim.propTypes = {
  r: number.isRequired,
  c: number.isRequired,
  name: string.isRequired,
  description: string,
  owned: bool.isRequired,
  available: bool.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Claim);
