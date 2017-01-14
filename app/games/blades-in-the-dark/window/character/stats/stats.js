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
  }
  handleMouseOver() {
    this.setState({hover: true});
  }
  handleMouseLeave() {
    this.setState({hover: false});
  }
  handleClick() {
    this.props.increment(this.props.value + 1);
  }
  render() {
    const { name, value, disabled, unlocked, update } = this.props;
    const { hover } = this.state;
    let dots = [];
    for (let i=1; i <= 4; i++) {
      const active = !disabled && unlocked && i == value + 1
      const className = cx('dot', {
        first: i == 1,
        checked: value >= i,
        active: active
      });
      dots.push(
        <div key={i}
             className={className}>
          @
        </div>
      )
      if (i == 1) {
        dots.push(
          <div key={'divider'} className='divider'/>
        );
      }
    }
    const active = !disabled && unlocked
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
  increment: React.PropTypes.func.isRequired
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
  handleHover(value) {
    this.setState({hover: value})
    console.log('HOVER', value);
  }
  handleClick(click) {
    this.props.update(this.props.value + this.getChange(click));
    console.log('CLICK', click);
  }
  render() {
    const { name, value, length, disabled, update } = this.props;
    const { hover } = this.state;
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
                  highlight={highlight}
                  onHover={this.handleHover.bind(this)}
                  onClick={this.handleClick.bind(this)}/>
      </div>
    );
  }
}

Header.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

Header.defaultProps = {
  disabled: false
}

const Stat = (props) => {
  const { disabled, xp, name, update } = props;
  const updateXP = (xp) => { update({xp}); };
  let actions = Object.assign({}, props);
  delete actions.disabled;
  delete actions.xp;
  delete actions.name;
  delete actions.update;
  let actionDivs = [];
  let dots = [];
  const names = Object.keys(actions);
  for (let i=0; i < names.length; i++) {
    const name = names[i];
    const value = actions[name]
    const increment = (value) => {
      update({
        [name]: value,
        xp: 0
      });
    };
    actionDivs.push(
      <Action key={i}
              disabled={disabled}
              name={name}
              value={value}
              unlocked={xp >= 6}
              increment={increment}/>
    );
  }
  return (
    <div className='stat'>
      <Header name={name} disabled={disabled} value={xp} length={6}
              update={updateXP}/>
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
  update: React.PropTypes.func
}

Stat.defaultProps = {
  disabled: false
}



const Stats = (props) => {
  const { money, update, disabled, insight, prowess, resolve } = props;
  const updateInsight = (insight) => { update({insight}); };
  const updateProwess = (prowess) => { update({prowess}); };
  const updateResolve = (resolve) => { update({resolve}); };
  const updateMoney = (money) => { update({money}); };
  const updateXP = (xp) => { update({xp}); };
  return (
    <div className='stats'>
    <div className='stat'>
      <Money {...money} disabled={disabled} update={updateMoney.bind(this)}/>
      <Header name='Playbook' disabled={disabled} value={props.xp} length={8}
              update={updateXP}/>
    </div>
      <Stat name='Insight'
            disabled={disabled}
            update={updateInsight}
            {...insight}/>
      <Stat name='Prowess'
            disabled={disabled}
            update={updateProwess}
            {...prowess}/>
      <Stat name='Resolve'
            disabled={disabled}
            update={updateResolve}
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
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

Stats.defaultProps = {
  disabled: false
}

export default Stats;
