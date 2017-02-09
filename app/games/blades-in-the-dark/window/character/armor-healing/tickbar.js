'use strict'

import React from 'react';
import styled from 'styled-components';

import { Tick } from 'games/blades-in-the-dark/window/common/tick';
import CommonButton from 'common/button';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { darken, lighten } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { stone, sun, shadow } = Colors;
const dark = darken(stone, 0.1);
const light = lighten(stone, 0.1);

const Button = styled(CommonButton)`
  &:disabled {
    .check {
      cursor: default;
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
  transition: color .25s;
  &:after {
    transition: background .25s;
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
    transition-property: stroke, fill;
    transition-duration: .25s;
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
