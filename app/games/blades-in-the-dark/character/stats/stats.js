'use strict'

import React from 'react';
import cx from 'classnames';

import { makeDotArray, Dot } from './dot.js';
import Money from './money.js';

import './stats.scss';

const Action = (props) => {
  let dots = makeDotArray({value: props.value - 1, max: 3, disabled: true});
  return (
    <div className='action'>
      {dots}
      <div className='name'>
        {props.name}
      </div>
    </div>
  )
}

Action.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired
}

const Header = (props) => {
  return (
    <div className='header'>
      <div className='name'>
        {props.name.toUpperCase()}
      </div>
      <div className='dots'>
        {makeDotArray({value: props.value, max: props.max})}
      </div>
    </div>
  );
}

Header.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired
}

Header.defaultProps = {
  active: false
}

const Stat = (props) => {
  let actions = [];
  let dots = [];
  for (let i=0; i < props.actions.length; i++) {
    actions.push(
      <Action key={i}
              name={props.actions[i]}
              value={props.values[i]}/>
    );
    dots.push(
      <Dot key={i}
           checked={props.values[i] > 0}
           disabled={true}/>
    )
  }
  return (
    <div className='stat'>
      <Header name={props.name} value={props.xp} max={6}/>
      <div className='actions'>
        <div className='first'>
          {dots}
        </div>
        <div className='rest'>
          {actions}
        </div>
      </div>
    </div>
  );
}

Stat.propTypes = {
  name: React.PropTypes.string.isRequired,
  xp: React.PropTypes.number.isRequired,
  actions: React.PropTypes.array.isRequired,
  values: React.PropTypes.array.isRequired
}



const Stats = (props) => {
  return (
    <div className='stats'>
    <div className='stat'>
      <Money coin={props.coin} stash={props.stash}/>
      <Header name='Playbook' value={props.playbookXP} max={8}/>
    </div>
      <Stat name='Insight'
            xp={props.insightXP}
            actions={['HUNT', 'STUDY', 'SURVEY', 'TINKER']}
            values={[props.hunt, props.study, props.survey, props.tinker]}/>
      <Stat name='Prowess'
            xp={props.prowessXP}
            actions={['FINESSE', 'PROWL', 'SKIRMISH', 'WRECK']}
            values={[props.finesse, props.prowl, props.skirmish, props.wreck]}/>
      <Stat name='Resolve'
            xp={props.resolveXP}
            actions={['ATTUNE', 'COMMAND', 'CONSORT', 'SWAY']}
            values={[props.attune, props.command, props.consort, props.sway]}/>
    </div>
  )
}

Stats.propTypes = {
  hunt: React.PropTypes.number.isRequired,
  study: React.PropTypes.number.isRequired,
  survey: React.PropTypes.number.isRequired,
  tinker: React.PropTypes.number.isRequired,
  finesse: React.PropTypes.number.isRequired,
  prowl: React.PropTypes.number.isRequired,
  skirmish: React.PropTypes.number.isRequired,
  wreck: React.PropTypes.number.isRequired,
  attune: React.PropTypes.number.isRequired,
  command: React.PropTypes.number.isRequired,
  consort: React.PropTypes.number.isRequired,
  sway: React.PropTypes.number.isRequired,
  playbookXP: React.PropTypes.number.isRequired,
  insightXP: React.PropTypes.number.isRequired,
  prowessXP: React.PropTypes.number.isRequired,
  resolveXP: React.PropTypes.number.isRequired
}

export default Stats;
