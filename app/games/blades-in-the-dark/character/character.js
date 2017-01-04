'use strict'

import React from 'react';
import cx from 'classnames';
import Portal from 'games/blades-in-the-dark/portal.js';
import './character.scss';

const Title = (props) => {
  let alias = null;
  if (props.alias) {
    alias = (
      <div className='alias'>
        "{props.alias}"
      </div>
    )
  }
  return (
    <div className='title'>
      <div className='name'>
        {props.name}
      </div>
      <div className='playbook'>
        the {props.playbook}
      </div>
      {alias}
    </div>
  );
}

Title.propTypes = {
  name: React.PropTypes.string.isRequired,
  playbook: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string,
}

const Check = (props) => {
  let className = cx(
    props.className,
    props.type,
    {
      checked: props.checked,
      disabled: props.disabled
    }
  )
  return (
    <div className={className}>{props.glyph}</div>
  )
}

Check.propTypes = {
  type: React.PropTypes.string,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  glyph: React.PropTypes.string
}

Check.defaultProps = {
  checked: false,
  disabled: false,
  className: null,
  value: ''
}

const Dot = (props) => {
  return (
    <Check type='dot'
           checked={props.checked}
           disabled={props.disabled}
           className={props.className}
           glyph="@"/>
  )
}

Dot.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string
}

Dot.defaultProps = {
  checked: false,
  disabled: false,
  className: null
}

const Checkbox = (props) => {
  return (
    <Check type='checkbox'
           checked={props.checked}
           disabled={props.disabled}
           className={props.className}/>
  )
}

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  className: null
}

const checkArray = ({value, max, type, glyph, active=false, className=null}) => {
  let i=0;
  let dots = [];
  while (i < value && i < max) {
    dots.push(
      <Check key={i} type={type} glyph={glyph} checked active={active} className={className}/>
    );
    i++;
  }
  while (i < max) {
    dots.push(
      <Check key={i} type={type} glyph={glyph} active={active} className={className}/>
    );
    i++;
  }
  return dots;
}

const dotArray = ({value, max, active=false, className=null}) => {
  return checkArray({value, max, active, className, type: 'dot', glyph: '@'});
}

const checkboxArray = ({value, max, active=false, className=null}) => {
  return checkArray({value, max, active, className, type: 'checkbox'});
}

const Action = (props) => {
  let dots = dotArray({value: props.value - 1, max: 3});
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
        {dotArray({value: props.value, max: props.max})}
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
           checked={props.values[i] > 0}/>
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
  let insight = '';
  let i=0;
  while (i < props.insightXP && i < 6) {
    insight += '@';
    i++;
  }
  while (i < 6) {
    insight += 'O';
    i++;
  }
  return (
    <div className='stats'>
    <div className='stat'>
      <div className='money'>
        <div className='column coin'>
          <div className='row stash'>
            <div className='stash label'>STASH</div>
          </div>
          <div className='row coin'>
            <div className='coin label'>COIN</div>
          </div>
          <div className='row coin'>
            {checkboxArray({value: props.coin, max: 2})}
          </div>
          <div className='row coin'>
            {checkboxArray({value: props.coin - 2, max: 2})}
          </div>
        </div>
        <div className='column stash'>
          <div className='row'>
            {checkboxArray({value: props.stash, max: 9})}
            <Checkbox checked={props.stash >= 10} className='end'/>
          </div>
          <div className='row'>
            {checkboxArray({value: props.stash - 10, max: 9})}
            <Checkbox checked={props.stash >= 20} className='end'/>
          </div>
          <div className='row'>
            {checkboxArray({value: props.stash - 20, max: 9})}
            <Checkbox checked={props.stash >= 30} className='end'/>
          </div>
          <div className='row'>
            {checkboxArray({value: props.stash - 30, max: 9})}
            <Checkbox checked={props.stash >= 40} className='end'/>
          </div>
        </div>
      </div>
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

const Character = (props) => {
  return (
    <Portal onChat={props.onChat}>
      <div className='character'>
        <Title {...props.character.names}/>
        <Stats {...props.character.stats}
               coin={props.character.coin}
               stash={props.character.stash}/>
      </div>
    </Portal>
  )
};

export default Character;
