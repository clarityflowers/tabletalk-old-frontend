'use strict'

import React from 'react';
import styled from 'styled-components';

import Label from 'blades/window/styles/label';
import { CoinArray } from 'blades/window/common/coin';

import Colors from 'blades/common/colors';
import { lighten, darken } from 'utils/color-tools';
import connect from 'utils/connect';
import cz from 'utils/styled-classes';

const { stone } = Colors;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
`
const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  &:not(:first-child) {
    margin-left: 0.25em;
  }
  &:not(:last-child) {
    margin-right: 0.25em;
  }
`
const VaultLabel = styled(cz(Label, 'locked'))`
  &.locked {
    background: ${lighten(stone, 0.2)};
  }
`
const VaultCoins = styled(cz(CoinArray, 'locked'))`
  &.locked .check {
    background: ${darken(stone, 0.05)};
  }
`

const SIZE = [4, 4, 8]
const TOTAL_SIZE = [4, 8, 16]

class Vaults extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: 0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    const { coin, vaults, dispatch } = this.props;
    if (coin < TOTAL_SIZE[vaults]) {
      dispatch('increment_coin');
    }
  }
  decrement() {
    const { coin, vaults, dispatch } = this.props;
    if (coin > 0) {
      dispatch('decrement_coin');
    }
  }
  mouseOver(value) {
    const { disabled } = this.props;
    return () => {
      if (!disabled) {
        this.setState({hover: value});
      }
    }
  }
  mouseLeave(value) {
    const { disabled } = this.props;
    const { hover } = this.state;
    return () => {
      if (hover == value && !disabled) {
        this.setState({hover: null});
      }
    }
  }
  render() {
    const { coin, vaults, disabled } = this.props;
    const { hover } = this.state;
    const vault1 = (vaults >= 1);
    const vault2 = (vaults >= 2);
    const arrayProps = {
      increment: this.increment,
      decrement: this.decrement,
      checkedProps: {
        onMouseOver: this.mouseOver(-1),
        onMouseLeave: this.mouseLeave(-1)
      },
      uncheckedProps: {
        onMouseOver: this.mouseOver(1),
        onMouseLeave: this.mouseLeave(1)
      }
    }
    const labelProps = {
      onClick: this.increment,
      onMouseOver: this.mouseOver(1)
    }
    return (
      <Container>
        <Column>
          <Label {...labelProps} disabled={disabled}>
            COIN
          </Label>
          <CoinArray value={coin} length={4} disabled={disabled}
                    highlight={hover}
                     {...arrayProps}/>
        </Column>
        <Column>
          <VaultLabel {...labelProps} disabled={disabled || !vault1}
                      locked={!vault1}>
            VAULT
          </VaultLabel>
          <VaultCoins value={vault1 ? coin : 0} length={4} offset={4}
                      highlight={hover}
                      disabled={disabled || vaults < 1}
                      locked={!vault1} {...arrayProps}/>
        </Column>
        <Column>
          <VaultLabel {...labelProps} disabled={disabled || vaults < 2}
                      locked={vaults < 2}>
            VAULT
          </VaultLabel>
          <VaultCoins value={vault2 ? coin : 0} length={8} offset={8}
                      highlight={hover}
                      disabled={disabled || !vault2}
                      locked={!vault2} {...arrayProps}/>
        </Column>
      </Container>
    )
  }
}

const { number, bool, func } = React.PropTypes;
Vaults.propTypes = {
  coin: number.isRequired,
  vaults: number.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Vaults);
