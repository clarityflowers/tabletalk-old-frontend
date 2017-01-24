'use strict'

import React from 'react';
import styled from 'styled-components';

import Header from './header';
import Money from './money';
import Section from './section';
import Stat from './stat';

const Div = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`

const Stats = (props) => {
  const {
    disabled, money, insight, prowess, resolve, xp,
    advanceAction, increment, decrement
  } = props;
  return (
    <Div>
      <Section>
        <Money {...money} disabled={disabled}/>
        <Header name='Playbook' disabled={disabled} value={xp} length={8}
                increment={increment}
                decrement={decrement}/>
      </Section>
      <Stat name='Insight' {...insight} disabled={disabled}
            advanceAction={advanceAction}/>
      <Stat name='Prowess' {...prowess} disabled={disabled}
            advanceAction={advanceAction}/>
      <Stat name='Resolve' {...resolve} disabled={disabled}
            advanceAction={advanceAction}/>
    </Div>
  )
}

Stats.propTypes = {
  xp: React.PropTypes.number.isRequired,
  insight: React.PropTypes.object.isRequired,
  prowess: React.PropTypes.object.isRequired,
  resolve: React.PropTypes.object.isRequired,
  money: React.PropTypes.object.isRequired,
  advanceAction: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

Stats.defaultProps = {
  disabled: false
}

export default Stats;
