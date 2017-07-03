'use strict'

import React from 'react';
import rx from 'resplendence';

import ArmorTickbar from './armor-tickbar';
import CommonRow from 'common/row';

const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  flex: 1 1 auto;
`

const Row = rx(CommonRow)`
  flex-flow: row wrap;
`

class Armor extends React.PureComponent {
  render() {
    const {
      used, available,
      heavyUsed, heavyAvailable,
      specialUsed, disabled
     } = this.props;
    return (
      <Container>
        <Row>
          <ArmorTickbar name='armor' used={used} available={available}
                    disabled={disabled}/>
          <ArmorTickbar name='heavy' used={heavyUsed} available={heavyAvailable}
                        disabled={disabled}/>
          <ArmorTickbar name='special' used={specialUsed}
                        disabled={disabled}/>
        </Row>
      </Container>
    )
  }
}

const { bool } = React.PropTypes;
Armor.PropTypes = {
  used: bool.isRequired,
  available: bool.isRequired,
  heavyUsed: bool.isRequired,
  heavyAvailable: bool.isRequired,
  specialUsed: bool.isRequired,
  disabled: bool.isRequired,
}

export default Armor;
