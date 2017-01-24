'use strict'

import React from 'react';
import styled from 'styled-components';

import Tab from './tab';
import DiceRoller from './dice-roller';
import Portal from './common/portal';
import Character from './character/character';
import Crew from './crew/crew';
import OptionsMenu from 'options/options-menu';

import { TAB_TYPES } from 'games/blades-in-the-dark/common/enums';
import Colors from 'games/blades-in-the-dark/common/colors';

const Container = styled.div`
  position: relative;
  font-size: 20px;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  @media only screen and (max-width: 800px) {
    margin-top: 2em;
    margin-bottom: 10em;
  }
`
const Tabs = styled.div`
  position: absolute;
  bottom: 0;
  height: 2em;
  width: 100%;
  display: flex;
  font-size: .75em;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.stone};
  box-shadow: 0 0 1em 1em ${Colors.stone};
  z-index: 100;
`

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
    <Container>
      <OptionsMenu route={props.route} on={props.options} auth={props.auth}/>
      <DiceRoller onChat={props.onChat}/>
      <Portal>
        {portal}
      </Portal>
      <Tabs>
        {tabs}
      </Tabs>
    </Container>
  );
}

export default Window;
