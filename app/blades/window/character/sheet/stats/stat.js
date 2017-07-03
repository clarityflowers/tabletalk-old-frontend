'use strict'

import React from 'react';
import rx from 'resplendence';
import autobind from 'autobind-decorator';

import Action from './action';
import Header from 'blades/window/common/xp';
import Section from './section';

import connect from 'utils/connect';

const Actions = rx('div')`
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
      disabled, xp, name, mastery, dispatch,...actions
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
                unlocked={xp >= 6 && (value < 3 || mastery)}/>
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

const { string, number, bool, func, object } = React.PropTypes;
Stat.propTypes = {
  name: string.isRequired,
  xp: number.isRequired,
  disabled: bool.isRequired,
  mastery: bool.isRequired,
  dispatch: func.isRequired
}

Stat.defaultProps = {
  disabled: false
}

export default connect(autobind(Stat));
