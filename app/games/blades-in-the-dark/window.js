'use strict'

import React from 'react';
import { Link } from 'react-router';
import OptionsMenu from 'options/options-menu.js';
import { HoverWiggle } from 'utils/hover-animate.js';
import { TAB_TYPES } from './enums.js';
import './window.scss';

class RollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick() {
    this.props.onChat(`/roll ${this.props.level}`)
  }
  render () {
    return (
      <HoverWiggle>
        <button className='roll' onClick={this.handleClick.bind(this)}>
          {this.props.level}
        </button>
      </HoverWiggle>
    )
  }
}

const Tab = (props) => {
  return (
    <Link to={`${props.baseUrl}/${props.index}`} className='tab'>
      {props.name}
    </Link>
  )
}

const Portal = (props) => {
  return (
    <div className='portal'>
      <RollButton level={0} onChat={props.onChat}/>
      <RollButton level={1} onChat={props.onChat}/>
      <RollButton level={2} onChat={props.onChat}/>
      <RollButton level={3} onChat={props.onChat}/>
      <RollButton level={4} onChat={props.onChat}/>
      <RollButton level={5} onChat={props.onChat}/>
      <RollButton level={6} onChat={props.onChat}/>
      <RollButton level={7} onChat={props.onChat}/>
    </div>
  );
}

const Character = (props) => {
  return (
    <Portal onChat={props.onChat}/>
  )
};

const Crew = (props) => {
  return (
    <div>hello</div>
  )
};

const Window = (props) => {
  let portal = null;
  let tabs = [];
  let baseUrl = `/games/${props.game.id}/go`;
  for (let i=0; i < props.tabs.length; i++) {
    let data = props.tabs[i];
    if (data.type == TAB_TYPES.CHARACTER) {
      let character = data.character;
      tabs.push(
        <Tab name={character.name}
             key={`${data.type}_${character.id}`}
             baseUrl={baseUrl}
             index={i}/>
      );
      if (i == props.activeTab) {
        portal = (
          <Character character={character}
                       onChat={props.onChat}/>
        )
      }
    }
    else if (data.type == TAB_TYPES.CREW) {
      let crew = data.crew;
      tabs.push(
        <Tab name={crew.name}
             key={`${data.type}_${crew.id}`}
             baseUrl={baseUrl}
             index={i}/>
      )
      if (i == props.activeTab) {
        portal = (
          <Crew crew={crew}
                onChat={props.onChat}/>
        )
      }
    }
  }
  return (
    <div id='window'>
      <OptionsMenu route={this.props.route} on={props.options} auth={props.auth}/>
      {portal}
      <div id='tabs'>
        {tabs}
      </div>
    </div>
  );
}

export default Window;
