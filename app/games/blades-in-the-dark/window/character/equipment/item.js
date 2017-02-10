'use strict'

import React from 'react';
import styled from 'styled-components';

import CommonButton from 'common/button';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { lighten, fadeout, fadein } from 'utils/color-tools';
import cz from 'utils/styled-classes';
import connect from 'utils/connect';

const { stone, sky, sand } = Colors;
const normal = lighten(stone, 0.3);
const normalUsed = lighten(normal, 0.2);
const light = sky;
const lightUsed = lighten(light, 0.1);
const heavy = fadeout(sand, 0.4);
const heavyUsed = fadein(heavy, 0.3);

const Button = styled(cz(CommonButton, ['heavy', 'light', 'used']))`
  font: ${Fonts.body};
  text-align: left;
  font: $body;
  color: ${normal};
  margin: 0 1em .2em 0;
  &.heavy {
    color: ${heavy};
  }
  &.light {
    color: ${light};
  }
  &.used {
    font-weight: 700;
    color: ${normalUsed};
    &.heavy {
      color: ${heavyUsed};
    }
    &.light {
      color: ${lightUsed};
    }
  }
  &:not(:disabled) {
    cursor: pointer;
    $hover: lighten($fire, 10%);
    &:active {
      color: lighten(mix(${normalUsed}, $hover, 20%), 20%);
    }
    &.heavy {
      &:active {
        color: lighten(mix(${heavyUsed}, $hover, 20%), 20%);
      }
    }
    &.light {
      &:active {
        color: lighten(mix(${lightUsed}, $hover, 20%), 20%);
      }
    }
    @media only screen and (max-width: 900px) {
      &:hover, &:focus {
        text-decoration: underline;
      }
    }
    @media only screen and (min-width: 901px) {
      &:focus {
        text-decoration: underline;
        outline: none;
      }
      &:hover {
        color: mix(${normalUsed}, $hover, 40%);
      }
      &.heavy {
        &:hover {
          color: mix(${heavyUsed}, $hover, 50%);
        }
      }
    }
    &.light {
      &:hover {
        color: mix(${lightUsed}, $hover, 50%);
      }
    }
  }
`

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { dispatch, name, used } = this.props;
    if (used) {
      dispatch('clear_item', name);
    }
    else {
      dispatch('use_item', name);
    }
  }
  render() {
    const { name, load, used, disabled } = this.props;
    return (
      <Button disabled={disabled} onClick={this.handleClick}
              used={used} heavy={load > 1} light={load < 1}>
        {name}
      </Button>
    )
  }
}

const { string, number, bool, func } = React.PropTypes;
Item.propTypes = {
  name: string.isRequired,
  load: number.isRequired,
  used: bool.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Item);
