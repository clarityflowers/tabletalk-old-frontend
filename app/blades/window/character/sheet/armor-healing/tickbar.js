'use strict'

import React from 'react';
import styled from 'styled-components';

import { Tick } from 'blades/window/common/tick';
import CommonButton from 'common/button';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { darken, lighten } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { stone, sun, shadow, fire } = Colors;
const dark = darken(stone, 0.1);
const light = lighten(stone, 0.1);

const Button = styled(CommonButton)`
  &:not(:disabled) {
    &:focus {
      .label {
        text-decoration: underline;
      }
    }
    &:hover {
      .label {
        color: ${fire};
        &:after {
          background: ${fire};
        }
      }
      .check {
        polygon {
          stroke: ${fire};
        }
        &.checked {
          polygon {
            fill: ${fire};
          }
        }
      }
    }
    &:active {
      .check {
        svg polygon {
          fill: ${lighten(fire, 0.3)};
        }
        &.checked svg polygon {
          fill: ${lighten(fire, 0.3)};
        }
      }
    }
  }
`;
const Label = styled(cz('div', 'off'))`
  font: ${Fonts.h1};
  color: ${sun};
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
    background: ${sun};
    box-shadow: ${shadow};
  }
  &.off {
    color: ${light};
    &:after {
      background: ${light};
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-end;
`;
const StyledTick = styled(cz(Tick, 'off'))`
  font-size: 1.5em;
  svg polygon {
    transition: stroke .1s, fill .1s;
  }
  &.off {
    svg polygon {
      stroke: ${light};
    }
    &.checked svg polygon {
      fill: ${light};
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
        <Label className='label' off={off}>
          {children}
        </Label>
        <StyledTick checked={checked} off={off} isButton={false}/>
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
