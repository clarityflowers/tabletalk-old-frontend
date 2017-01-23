'use strict'

import React from 'react';
import cx from 'classnames';

import { Dot, DotArray } from './dot.js';
import Money from './money.js';

import './stats.scss';

class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
    this.clicked = false;
  }
  handleMouseOver() {
    this.setState({hover: true});
  }
  handleMouseLeave() {
    this.setState({hover: false});
  }
  handleClick() {
    if (!this.clicked) {
      this.clicked = true;
      this.props.advance();
    }
    setTimeout(() => {console.log('BLUH'); this.clicked = false}, 2000);
  }
  render() {
    const { name, value, disabled, unlocked, advance } = this.props;
    const { hover } = this.state;
    let dots = [];
    for (let i=1; i <= 4; i++) {
      const active = !disabled && unlocked && i == value + 1
      const className = cx('check', 'dot', {
        first: i == 1,
        checked: value >= i,
        active: active
      });
      dots.push(
        <div key={i}
             className={className}/>
      )
      if (i == 1) {
        dots.push(
          <div key={'divider'} className='divider'/>
        );
      }
    }
    const active = !disabled && unlocked && value < 4
    const className = cx('action', {
      highlight: active && hover
    });
    let handlers = {}
    if (active) {
      handlers = {
        onMouseOver: this.handleMouseOver.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onClick: this.handleClick.bind(this),
        tabIndex: 0
      }
    }
    return (
      <button className={className} {...handlers} disabled={!active}>
        <div className='container'>
          {dots}
          <div className='name'>
            {name[0].toUpperCase() + name.substring(1)}
          </div>
        </div>
      </button>
    );
  }
}

Action.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool,
  unlocked: React.PropTypes.bool.isRequired,
  advance: React.PropTypes.func.isRequired
}

Action.defaultProps = {
  disabled: false
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    }
  }
  getChange(who) {
    const { value } = this.props;
    let change = 0;
    if (who != null) {
      if (who > value) {
        change = 1;
      }
      else {
        change = -1;
      }
    }
    return change;
  }
  hover(value) {
    return () => {
      this.setState({hover: value})
    }
  }
  render() {
    const { name, value, length, disabled, increment, decrement } = this.props;
    const { hover } = this.state;
    const checkedProps = {
      onClick: decrement
    }
    const uncheckedProps = {
      onClick: increment
    }
    const highlight = this.getChange(hover);
    const className = cx('header', {
      highlight: value == length
    })
    return (
      <div className={className}>
        <div className='name'>
          {name.toUpperCase()}
        </div>
        <DotArray className='dots'
                  value={value}
                  length={length}
                  disabled={disabled}
                  checkedProps={checkedProps}
                  uncheckedProps={uncheckedProps}/>
      </div>
    );
  }
}

Header.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

Header.defaultProps = {
  disabled: false
}

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
    <div className='stat'>
      <Header name={name} disabled={disabled} value={xp} length={6}
              increment={increment} decrement={decrement}/>
      <div className='actions'>
        {actionDivs}
      </div>
    </div>
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



const Stats = (props) => {
  const {
    disabled, money, insight, prowess, resolve, xp,
    advanceAction, increment, decrement
  } = props;
  return (
    <div className='stats'>
    <div className='stat'>
      <Money {...money} disabled={disabled}/>
      <Header name='Playbook' disabled={disabled} value={xp} length={8}
              increment={increment}
              decrement={decrement}/>
    </div>
      <Stat name='Insight'
            disabled={disabled}
            advanceAction={advanceAction}
            {...insight}/>
      <Stat name='Prowess'
            disabled={disabled}
            advanceAction={advanceAction}
            {...prowess}/>
      <Stat name='Resolve'
            disabled={disabled}
            advanceAction={advanceAction}
            {...resolve}/>
    </div>
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
