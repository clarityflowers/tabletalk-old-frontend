'use strict'

import React from 'react';
import styled from 'styled-components';

import CommonButton from 'common/button';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { lighten } from 'utils/color-tools';
import connect from 'utils/connect';

const { fire, textShadow, sky } = Colors;
const active = lighten(sky, 0.3);

const Button = styled(CommonButton)`
  margin: 0 .5em;
  font: ${Fonts.h1};
  color: ${fire};
  text-shadow: ${textShadow};
  &:not(:disabled) {
    cursor: pointer;
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      color: ${sky};
    }
    &:active {
      color: ${active};
    }
  }
`

class Trauma extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { name, dispatch } = this.props;
    dispatch('add_trauma', name);
  }
  render() {
    const { name, disabled } = this.props;
    return (
      <Button name={name} disabled={disabled} onClick={this.handleClick}>
        {name}
      </Button>
    )
  }
}

const { string, bool, func } = React.PropTypes;
Trauma.propTypes = {
  name: string.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Trauma);
