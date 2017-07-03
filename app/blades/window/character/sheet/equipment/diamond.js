'use strict'

import React from 'react';
import rx from 'resplendence';

import Label from './label';
import CommonButton from 'common/button';

import connect from 'utils/connect';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Button = rx(CommonButton)`--1
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
          fill: $fire;
        }
        &.over svg polygon {
          fill: lighten($fire, 20%);
        }
      }
      &:hover {
        svg polygon {
          fill: $fire;
        }
        &.over svg polygon {
          fill: lighten($fire, 20%);
        }
      }
      &:active {
        svg polygon {
          fill: lighten($fire, 30%);
        }
        &.over svg polygon {
          fill: lighten($fire, 20%);
        }
      }
    }
    &:focus {
      svg polygon {
        stroke: $fire;
      }
      &.over svg polygon {
        stroke: lighten($fire, 20%);
      }
      div.label {
        opacity: 1;
      }
    }
    &:hover {
      svg polygon {
        stroke: $fire;
      }
      &.over svg polygon {
        stroke: lighten($fire, 20%);
      }
    }
    &:active {
      svg polygon {
        stroke: lighten($fire, 30%);
      }
      &.over svg polygon {
        stroke: lighten($fire, 20%);
      }
    }
  }
`
const Container = rx('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Svg = rx('svg')`
  filter: drop-shadow($textShadow);
  z-index: 2;
`
const Polygon = rx('polygon')`
  fill: darken($stone, 20%);
  stroke: $sun;
  &.over {
    stroke: $fire; 
  }

  transition: fill 1s, stroke .2s;
  &.checked {
    fill: $sun;
    &.over {
      fill: $fire; 
    }
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
      <Button {...rest} rx={{over, checked}}
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
                     rx={{checked, over}}/>
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
