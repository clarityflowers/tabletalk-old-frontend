'use strict'

import React from 'react';
import styled from 'styled-components';

import Header from './header';
import Money from './money';
import Section from './section';
import Stat from './stat';

import connect from 'utils/connect';

const Div = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`

class Stats extends React.PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  increment () {
    const { dispatch } = this.props;
    dispatch('increment_xp', 'playbook');
  }
  decrement () {
    const { dispatch } = this.props;
    dispatch('decrement_xp', 'playbook');
  }
  render () {
    const {
      disabled, money, insight, prowess, resolve, xp
    } = this.props;
    return (
      <Div>
        <Section>
          <Money {...money} disabled={disabled}/>
          <Header name='Playbook' disabled={disabled} value={xp} length={8}
                  increment={this.increment} decrement={this.decrement}/>
        </Section>
        <Stat name='Insight' {...insight} disabled={disabled}/>
        <Stat name='Prowess' {...prowess} disabled={disabled}/>
        <Stat name='Resolve' {...resolve} disabled={disabled}/>
      </Div>
    )
  }
}

Stats.propTypes = {
  xp: React.PropTypes.number.isRequired,
  insight: React.PropTypes.object.isRequired,
  prowess: React.PropTypes.object.isRequired,
  resolve: React.PropTypes.object.isRequired,
  money: React.PropTypes.object.isRequired,
  disabled: React.PropTypes.bool
}

Stats.defaultProps = {
  disabled: false
}

export default connect(Stats);
