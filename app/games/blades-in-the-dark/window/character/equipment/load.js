'use strict'

import React from 'react';
import styled from 'styled-components';

import Diamond from './diamond';
import Button from 'common/button';

import { background, color, dark, hover, active, shadow, shadowColor } from './colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import connect from 'utils/connect';
import props from 'utils/props';
import cz from 'utils/styled-classes';

const Container = styled.div`
  margin: 0 .25em 1em .25em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: stretch;
  align-items: center;
`

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`

const Label = styled(props(Button, 'over'))`
  transform: rotate(90deg);
  font: ${Fonts.h1};
  position: relative;
  background: ${background};
  padding: 0 .2em;
  box-sizing: border-box;
  color: ${color};
  margin: .6em 0;
  box-shadow: 3px 2px 2px 1px ${shadowColor};
  cursor: pointer;
  transition: background 1s;
  &:not(:disabled) {
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      color: ${hover};
    }
    &:active {
      color: ${active};
    }
  }
`

const Gap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  overflow: visible;
  height: 0;
  flex: 1 0 0;
`

const Dash = styled(props('div', 'length', 'over', 'max'))`
  position: relative;
  width: 1.3em;
  background: none;
  min-height: 7.4em;
  flex: 1 1 auto;
  display: flex;
  height: 100
  flex-flow: column nowrap;
  align-items: center;
  &:before {
    content: "";
    z-index: 1;
    box-shadow: ${shadow};
  }
  &:after {
    z-index: 3;
    background-color: ${background};
  }
  &:before, &:after {
    content: "";
    position: absolute;
    left: .4em;
    top: 0;
    height: ${p => (100 / p.max) * p.length}%;
    width: .5em;
    transition: height 1s ease-in-out, background 1s;
    pointer-events: none;
  }
`

const Dot = styled.div`
  height: .2em;
  width: .2em;
  background: ${dark};
  border-radius: .5em;
  position: relative;
  z-index: 6;
  top: .1em;
`

const DEFAULT = [3, 5, 6];

class Load extends React.PureComponent {
  constructor(props) {
    super(props);
    this.set = this.set.bind(this);
    this.clear = this.clear.bind(this);
    this.light = this.light.bind(this);
    this.normal = this.normal.bind(this);
    this.heavy = this.heavy.bind(this);
  }
  set(value) {
    const { dispatch } = this.props;
    dispatch('set_load', value);
  }
  clear() {
    const { dispatch } = this.props;
    dispatch('clear_items');
  }
  heavy() {
    const { load, bonus } = this.props;
    if (load != DEFAULT[2] + bonus) {
      this.set(DEFAULT[2] + bonus);
    }
  };
  normal() {
    const { load, bonus } = this.props;
    if (load != DEFAULT[1] + bonus) {
      this.set(DEFAULT[1] + bonus);
    }
  };
  light() {
    const { load, bonus } = this.props;
    if (load != DEFAULT[0] + bonus) {
      this.set(DEFAULT[0] + bonus);
    }
  };
  render() {
    const { load, bonus, carrying, disabled } = this.props;
    console.log('RENDER LOAD', load, bonus, carrying);
    const clear = null;
    const over = carrying > load;
    let buttons = [];
    let i=1;
    while (i < DEFAULT[0] + bonus) {
      buttons.push(
        <Gap key={i}>
          <Dot/>
        </Gap>
      );
      i++;
    }
    buttons.push(
      <Gap key={i}>
        <Diamond checked={load >= i} over={over} value={i}
                 name='light' disabled={disabled || load == i}/>
      </Gap>
    );
    i++;
    while (i < DEFAULT[1] + bonus) {
      buttons.push(
        <Gap key={i}>
          <Dot/>
        </Gap>
      );
      i++;
    }
    buttons.push(
      <Gap key={i}>
        <Diamond checked={load >= i} over={over} value={i}
                 name='normal' disabled={disabled || load == i}/>
      </Gap>
    );
    i++;
    while (i < DEFAULT[2] + bonus) {
      buttons.push(
        <Gap key={i}>
          <Dot/>
        </Gap>
      );
      i++;
    }
    buttons.push(
      <Gap key={i}>
        <Diamond checked={load >= i} over={over} value={i}
                 name='heavy' disabled={disabled || load == i}/>
      </Gap>
    );
    i++;
    return (
      <Container>
        <Label disabled={disabled} onClick={this.clear} over={over}>
          LOAD
        </Label>
        <Dash length={carrying} max={DEFAULT[2] + bonus} over={over}>
          {buttons}
        </Dash>
      </Container>
    );
  }
}

const { number, bool, func } = React.PropTypes;
Load.propTypes = {
  load: number.isRequired,
  carrying: number.isRequired,
  disabled: bool.isRequired,
  bonus: number.isRequired,
  dispatch: func.isRequired
}

export default connect(Load);
