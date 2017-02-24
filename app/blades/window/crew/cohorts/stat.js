'use strict'

import React from 'react';
import styled from 'styled-components';

import { Tick as CommonTick } from 'blades/window/common/tick';
import CommonButton from 'common/button';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { lighten, darken } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { sun, stone, fire, textShadow } = Colors;
const { h1 } = Fonts;

const Button = styled(CommonButton)`
  &:not(:disabled) {
    &:focus {
      div {
        text-decoration: underline;
      }
    }
    &:hover {
      div {
        color: ${lighten(fire, 0.1)};
      }
      .check {
        polygon {
          fill: ${fire};
        }
        &.checked polygon {
          stroke: ${fire};
        }
      }
    }
    &:active {
      div {
        color: ${lighten(fire, 0.3)}
      }
      .check {
        polygon {
          fill: ${lighten(fire, 0.3)};
        }
        &.checked polygon {
          stroke: ${lighten(fire, 0.3)};
        }
      }
    }
  }
`
const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Tick = styled((props) => (<CommonTick isButton={false} {...props}/>))`
  z-index: 10;
  overflow: hidden;
  width: .6em;
  height: 1.1em;
  font-size: 1.2em;
  svg {
    width: .5em;
    padding-left: .1em;
    position: relative;
    top: -.3em;
    polygon {
    }
  }
`
const Label = styled(cz('div', 'harm'))`
  font: ${h1};
  font-size: .8em;
  margin: .1em .15em 0 .3em;
  color: ${sun};
  text-shadow: ${textShadow};
  &.harm {
    color: ${fire}
  }
`

class Stat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { set, checked } = this.props;
    set(!checked);
  }
  render() {
    const { name, harm, checked, disabled } = this.props;
    return (
      <Button disabled={disabled} onClick={this.handleClick}>
        <Container>
          <Label harm={harm}>{name}</Label>
          <Tick checked={checked}/>
        </Container>
      </Button>
    )
  }
}

const { string, bool, func } = React.PropTypes;
Stat.propTypes = {
  name: string.isRequired,
  harm: bool,
  checked: bool.isRequired,
  disabled: bool.isRequired,
  set: func.isRequired
}

export default Stat;
