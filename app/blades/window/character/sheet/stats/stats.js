'use strict'

import React from 'react';
import styled from 'styled-components';

import Header from 'blades/window/common/xp';
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
  shouldComponentUpdate(newProps) {
    const keys = Object.keys(newProps);
    const oldKeys = Object.keys(this.props);
    if (keys.length != oldKeys.length) {
      return true;
    }
    for (let i=0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof newProps[key] !== "function") {
        if (newProps[key] !== this.props[key]) {
          return true;
        }
      }
    }
    return false;
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
      coin, stash, playbookXP,
      hunt, study, survey, tinker, insightXP,
      finesse, prowl, skirmish, wreck, prowessXP,
      attune, command, consort, sway, resolveXP,
      mastery,
      disabled
    } = this.props;
    const money = {coin, stash};
    const insight = {hunt, study, survey, tinker, mastery, xp: insightXP};
    const prowess = {finesse, prowl, skirmish, wreck, mastery, xp: prowessXP};
    const resolve = {attune, command, consort, sway, mastery, xp: resolveXP};
    return (
      <Div>
        <Section>
          <Money {...money} disabled={disabled}/>
          <Header name='Playbook' disabled={disabled} value={playbookXP} length={8}
                  increment={this.increment} decrement={this.decrement}/>
        </Section>
        <Stat name='Insight' {...insight} disabled={disabled}/>
        <Stat name='Prowess' {...prowess} disabled={disabled}/>
        <Stat name='Resolve' {...resolve} disabled={disabled}/>
      </Div>
    )
  }
}

const { number, bool } = React.PropTypes;
Stats.propTypes = {
  coin: number.isRequired,
  stash: number.isRequired,
  playbookXP: number.isRequired,
  hunt: number.isRequired,
  study: number.isRequired,
  survey: number.isRequired,
  tinker: number.isRequired,
  insightXP: number.isRequired,
  finesse: number.isRequired,
  prowl: number.isRequired,
  skirmish: number.isRequired,
  wreck: number.isRequired,
  prowessXP: number.isRequired,
  attune: number.isRequired,
  command: number.isRequired,
  consort: number.isRequired,
  sway: number.isRequired,
  resolveXP: number.isRequired,
  mastery: bool.isRequired,
  disabled: bool.isRequired
}

Stats.defaultProps = {
  disabled: false
}

export default connect(Stats);
