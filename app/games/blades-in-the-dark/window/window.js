'use strict'

import React from 'react';
import cx from 'classnames';
import DiceRoller from './dice-roller.js';
import Character from './character/character.js';
import Crew from './crew/crew.js';
import Link from 'utils/link.js';
import OptionsMenu from 'options/options-menu.js';
import { TAB_TYPES } from 'games/blades-in-the-dark/common/enums.js';
import './window.scss';

const Tab = (props) => {
  let className = cx(
    'tab',
    {
      active: parseInt(props.route.nextName) == props.index
    }
  );
  return (
    <Link route={props.route.push(props.index)} className={className}>
      {props.name}
    </Link>
  )
}

const Window = (props) => {
  const { update, send, me } = props;
  const updateCharacter = (character) => {
    update({character});
  }
  const sendCharacter = (data) => {
    send({what: "character", data: data});
  }
  let portal = null;
  let tabs = [];
  let baseUrl = `/games/${props.game.id}/go`;
  let route = props.route;
  let activeTab = null;
  if (route.isExact) {
    portal = null;
  }
  else {
    route = route.next();
    activeTab = parseInt(route.name);
  }
  for (let i=0; i < props.tabs.length; i++) {
    let data = props.tabs[i];
    if (data.type == TAB_TYPES.CHARACTER) {
      let character = data.character;
      tabs.push(
        <Tab route={props.route}
             name={character.name}
             key={`${data.type}_${character.id}`}
             baseUrl={baseUrl}
             index={i}/>
      );
      if (i == activeTab) {
        portal = (
          <Character {...character}
                     onChat={props.onChat}
                     update={updateCharacter.bind(this)}
                     send={sendCharacter}
                     me={me}/>
        )
      }
    }
    else if (data.type == TAB_TYPES.CREW) {
      let crew = data.crew;
      tabs.push(
        <Tab route={props.route}
             name={crew.name}
             key={`${data.type}_${crew.id}`}
             baseUrl={baseUrl}
             index={i}/>
      )
      if (i == activeTab) {
        portal = (
          <Crew crew={crew}
                onChat={props.onChat}/>
        )
      }
    }
  }
  return (
    <div id='window'>
      <OptionsMenu route={props.route} on={props.options} auth={props.auth}/>
      <DiceRoller onChat={props.onChat}/>
      {portal}
      <div id='tabs'>
        {tabs}
      </div>
    </div>
  );
}

export default Window;
