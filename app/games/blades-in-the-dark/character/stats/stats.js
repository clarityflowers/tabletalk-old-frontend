'use strict'

import React from 'react';
import cx from 'classnames';

import { Dot, DotArray } from './dot.js';
import Money from './money.js';

import './stats.scss';

const Action = (props) => {
  const { name, value, disabled } = props;
  // let dots = makeDotArray({value: props.value - 1, max: 3, disabled: true});
  return (
    <div className='action'>
      <DotArray value={value}
                offset={1}
                length={3}
                disabled={false}
                onClick={() => {}}
                onHover={() => {}}/>
      <div className='name'>
        {name[0].toUpperCase() + name.substring(1)}
      </div>
    </div>
  )
}

Action.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool
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
    return (
      <div className='header'>
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
    const updateAction = (value) => { update({[name]: value}); };
    actionDivs.push(
      <Action key={i}
              disabled={disabled}
              name={name}
              value={value}/>
    );
    dots.push(
      <Dot key={i}
           checked={value > 0}
           disabled={true}/>
    )
  }
  return (
    <div className='stat'>
      <Header name={name} disabled={disabled} value={xp} length={6}
              update={updateXP}/>
      <div className='actions'>
        <div className='first'>
          {dots}
        </div>
        <div className='rest'>
          {actionDivs}
        </div>
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
