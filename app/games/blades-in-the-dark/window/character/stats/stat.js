'use strict'

import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Action from './action';
import Header from './header';
import Section from './section';

import connect from 'utils/connect';

const Actions = styled.div`
  margin: 0 .5em;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`

class Stat extends React.PureComponent {
  increment() {
    const { dispatch, name } = this.props;
    dispatch('increment_xp', name.toLowerCase());
  }
  decrement() {
    const { dispatch, name } = this.props;
    dispatch('decrement_xp', name.toLowerCase());
  }
  render() {
    const {
      disabled, xp, name, dispatch, ...actions
    } = this.props;
    let actionDivs = [];
    let dots = [];
    const names = Object.keys(actions);
    for (let i=0; i < names.length; i++) {
      const name = names[i];
      const value = actions[name]
      actionDivs.push(
        <Action key={i}
                disabled={disabled}
                name={name}
                value={value}
                unlocked={xp >= 6}/>
        );
      }
      return (
        <Section>
          <Header name={name} disabled={disabled} value={xp} length={6}
                  increment={this.increment} decrement={this.decrement}/>
          <Actions>
            {actionDivs}
          </Actions>
        </Section>
      );
  }
}

Stat.propTypes = {
  name: React.PropTypes.string.isRequired,
  xp: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool
}

Stat.defaultProps = {
  disabled: false
}

export default connect(autobind(Stat));
