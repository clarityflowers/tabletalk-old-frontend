'use strict'

import React from 'react';
import rx from 'resplendence';

import { Tick } from 'blades/window/common/tick';
import CommonButton from 'common/button';


rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";

$dark: darken($stone, 10%);
$light: lighten($stone, 10%);
`

const Button = rx(CommonButton)`--1
  &:not(:disabled) {
    &:focus {
      .label {
        text-decoration: underline;
      }
    }
    &:hover {
      .label {
        color: $fire;
        &:after {
          background: $fire;
        }
      }
      .check {
        polygon {
          stroke: $fire;
        }
        &.checked {
          polygon {
            fill: $fire;
          }
        }
      }
    }
    &:active {
      .check {
        svg polygon {
          fill: lighten($fire, 30%);
        }
        &.checked svg polygon {
          fill: lighten($fire, 30%);
        }
      }
    }
  }
`;
const Label = rx('div')`
  font: $h1;
  color: $sun;
  height: auto;
  padding: .1em .2em;
  z-index: 3;
  position: relative;
  flex: 1 1 auto;
  text-align: right;
  transition: color .1s;
  &:after {
    transition: background .1s;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: .2em;
    z-index: 2;
    background: $sun;
    box-shadow: $shadow;
  }
  &.off {
    color: $light;
    &:after {
      background: $light;
    }
  }
`;
const Container = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-end;
`;
const StyledTick = rx(Tick)`--1
  font-size: 1.5em;
  svg polygon {
    transition: stroke .1s, fill .1s;
  }
  &.off {
    svg polygon {
      stroke: $light;
    }
    &.checked svg polygon {
      fill: $light;
    }
  }
`;

const Tickbar = (props) => {
  const { className, checked, use, off, disabled, children } = props;
  const handleClick = () => { use(!checked); }
  return (
    <Button className={className} onClick={handleClick.bind(this)}
            disabled={disabled || off}>
      <Container>
        <Label className='label' rx={{off}}>
          {children}
        </Label>
        <StyledTick checked={checked} rx={{off}} isButton={false}/>
      </Container>
    </Button>
  )
}

Tickbar.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  use: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default Tickbar;
