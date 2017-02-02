'use strict'

import React, { PureComponent } from 'react';
import styled from 'styled-components';

import StashRow from './stash-row';
import Wallet from './wallet';

import Row from 'common/row';
import Column from 'common/column';
import Button from 'common/button';
import Colors from 'games/blades-in-the-dark/common/colors';
import { lighten } from 'utils/color-tools';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import connect from 'utils/connect';

const Div = styled(Row)`
  justify-content: center;
  font-size: .8em;
  margin-bottom: 1em;
`
const labelActiveColor = lighten(Colors.fire, 0.3);
const labelDisabledColor = lighten(Colors.stone, 0.3);
const Label = styled(Button)`
  font: ${Fonts.h1};
  font-size: 0.8em;
  text-shadow: ${Colors.textShadow};
  &:disabled {
    color: ${labelDisabledColor};
  }
  &:not(:disabled) {
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      color: ${Colors.fire};
    }
    &:active {
      color: ${labelActiveColor};
    }
  }
`
const coinHover = lighten(Colors.sand, 0.15);
const CoinLabel = styled(Label)`
  color: ${Colors.sand};
`
const StashLabel = styled(Label)`
  color: ${Colors.sky};
  margin-right: -0.7em;
`
const Left = styled(Column)`
  padding-right: 0.7em;
`
const Right = styled(Column)`
  align-self: flex-end;
`

class Money extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    }
  }
  mouseOver(value) {
    return () => {
      this.setState({hover: value});
    }
  }
  handleMouseLeave() {
    this.setState({hover: null});
  }
  transferToStash() {
    const { coin, stash, dispatch } = this.props;
    const { hover } = this.state;
    if (hover == 'coin_to_stash' && (stash + 1 > 39 || coin - 1 < 1)) {
      this.setState({hover: null});
    }
    dispatch('transfer_to_stash');
  }
  transferToCoin() {
    const { coin, stash, dispatch } = this.props;
    const { hover } = this.state;
    if (hover == 'stash_to_coin' && (stash - 2 < 2 || coin + 1 > 3)) {
      this.setState({hover: null});
    }
    dispatch('transfer_to_coin');
  }
  render() {
    const { coin, stash, disabled } = this.props;
    const { hover } = this.state;
    let stashRows = [];
    let stashHighlight = 0;
    let coinHighlight = 0;
    if (hover == "coin_to_stash") {
      stashHighlight = 1;
      coinHighlight = -1;
    }
    if (hover == "stash_to_coin") {
      stashHighlight = -2;
      coinHighlight = 1;
    }
    for (let i=0; i < 4; i++) {
      stashRows.push(
        <StashRow key={i}
                  value={stash}
                  offset={i * 10}
                  highlight={stashHighlight}/>
      );
    }
    return (
      <Div>
        <Left>
          <StashLabel disabled={disabled || coin < 1 || stash > 39 }
                      onClick={this.transferToStash.bind(this)}
                      onMouseOver={this.mouseOver("coin_to_stash")}
                      onMouseLeave={this.handleMouseLeave.bind(this)}>
            STASH
          </StashLabel>
          <CoinLabel disabled={disabled || coin > 3 || stash < 2}
                     onClick={this.transferToCoin.bind(this)}
                     onMouseOver={this.mouseOver("stash_to_coin")}
                     onMouseLeave={this.handleMouseLeave.bind(this)}>
            COIN
          </CoinLabel>
          <Wallet value={coin}
                  disabled={disabled}
                  highlight={coinHighlight}/>
        </Left>
        <Right>
          {stashRows}
        </Right>
      </Div>
    );
  }
}

const { number, bool, func } = React.PropTypes;
Money.propTypes = {
  coin: number.isRequired,
  stash: number.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired

}

Money.defaultProps = {
  disabled: false
}

export default connect(Money);
