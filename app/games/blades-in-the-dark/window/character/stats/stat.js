'use strict'

import React from 'react';
import styled from 'styled-components';

import Action from './action';
import Header from './header';
import Section from './section';

const Actions = styled.div`
  margin: 0 .5em;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`

const Stat = (props) => {
  const {
    disabled, xp, name,
    increment, decrement, advanceAction
  } = props;
  let actions = Object.assign({}, props);
  delete actions.disabled;
  delete actions.xp;
  delete actions.name;
  delete actions.increment;
  delete actions.decrement;
  delete actions.advanceAction;
  let actionDivs = [];
  let dots = [];
  const names = Object.keys(actions);
  for (let i=0; i < names.length; i++) {
    const name = names[i];
    const value = actions[name]
    const advance = () => { advanceAction(name); }
    actionDivs.push(
      <Action key={i}
              disabled={disabled}
              name={name}
              value={value}
              unlocked={xp >= 6}
              advance={advance}/>
    );
  }
  return (
    <Section>
      <Header name={name} disabled={disabled} value={xp} length={6}
              increment={increment} decrement={decrement}/>
      <Actions>
        {actionDivs}
      </Actions>
    </Section>
  );
}

Stat.propTypes = {
  name: React.PropTypes.string.isRequired,
  xp: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  advanceAction: React.PropTypes.func.isRequired
}

Stat.defaultProps = {
  disabled: false
}

export default Stat;
