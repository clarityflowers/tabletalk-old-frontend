'use strict'

import React from 'react';
import styled from 'styled-components';

import Label from './label';
import CommonButton from 'common/button';

import { color, background, active, hover, dark, shadow, textShadow } from './colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { lighten, darken } from 'utils/color-tools';
import cz from 'utils/styled-classes';
import props from 'utils/props';
import connect from 'utils/connect';

const Button = styled(props(cz(CommonButton, 'checked'), 'over'))`
  width: 1.2em;
  height: 1.2em;
  top: .6em;
  flex: 0 0 auto;
  position: relative;
  z-index: 4;
  overflow: visible;
  &.checked:not(:hover):not(:focus) {
    z-index: 2;
  }
  &:not(:disabled) {
    cursor: pointer;
    &.checked {
      &:focus {
        z-index: 5;
        svg polygon {
          fill: ${hover};
        }
      }
      &:hover {
        svg polygon {
          fill: ${hover};
        }
      }
      &:active {
        svg polygon {
          fill: ${active};
        }
      }
    }
    &:focus {
      svg polygon {
        stroke: ${hover};
      }
      div.label {
        opacity: 1;
      }
    }
    &:hover {
      svg polygon {
        stroke: ${hover};
      }
    }
    &:active {
      svg polygon {
        stroke: ${active};
      }
    }
  }
`
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Svg = styled.svg`
  filter: drop-shadow(${textShadow});
  z-index: 2;
`
const Polygon = styled(props(cz('polygon', 'checked'), 'over'))`
  fill: ${dark};
  stroke: ${background};

  transition: fill 1s, stroke .2s;
  &.checked {
    fill: ${background};
  }
`


class Diamond extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.timeout = null;
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleMouseOver() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({hover: true});
  }
  handleMouseLeave() {
    this.timeout = setTimeout(() => {
      this.setState({hover: false});
    }, 500);
  }
  handleClick() {
    const { dispatch, value } = this.props;
    dispatch('set_load', value);
  }
  render() {
    const { checked, name, over, dispatch, value, ...rest } = this.props;
    const { hover } = this.state;
    return (
      <Button checked={checked} {...rest} over={over}
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseLeave}
              onClick={this.handleClick}>
        <Container>
          <Svg x="0px"
               y="0px"
               preserveAspectRatio="none"
               width="1.2em"
               height="1.2em"
               viewBox="0 0 110 110">
            <Polygon strokeWidth="10" points="55,5 5,55 55,105 105,55"
                     checked={checked} over={over}/>
          </Svg>
          <Label name={name} on={hover} setWidth={this.setWidth} over={over}/>
        </Container>
      </Button>
    )
  }
}

const { bool, string, func, number } = React.PropTypes;
Diamond.propTypes = {
  checked: bool.isRequired,
  name: string.isRequired,
  dispatch: func.isRequired,
  value: number.isRequired
}

export default connect(Diamond);
