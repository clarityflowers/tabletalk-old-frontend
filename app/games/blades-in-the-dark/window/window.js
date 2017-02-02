'use strict'

import React from 'react';
import styled from 'styled-components';

import Tab from './tab';
import DiceRoller from './dice-roller';
import Portal from './common/portal';
import Character from './character/character';
import Crew from './crew/crew';
import OptionsMenu from 'options/options-menu';

import { MOBILE_BREAKPOINT } from 'games/blades-in-the-dark/common/constants';
import { TAB_TYPES } from 'games/blades-in-the-dark/common/enums';
import Colors from 'games/blades-in-the-dark/common/colors';

const Container = styled.div`
  position: relative;
  font-size: 20px;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-bottom: 20px;
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

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.sendCharacter = this.sendCharacter.bind(this);
  }
  sendCharacter(data) {
    const { send } = this.props;
    send({what: "character", data: data});
  }
  render() {
    const { update, send, me, game, tabs, route, options, auth, onChat } = this.props;
    console.log('RENDER WINDOW', tabs);
    let activeRoute = this.props.route;
    let portal = null;
    let tabDoms = [];
    let baseUrl = `/games/${game.id}/go`;
    let activeTab = null;
    if (route.isExact) {
      portal = null;
    }
    else {
      activeRoute = route.next();
      activeTab = parseInt(activeRoute.name);
    }
    for (let i=0; i < tabs.length; i++) {
      let data = tabs[i];
      if (data.type == TAB_TYPES.CHARACTER) {
        let character = data.character;
        tabDoms.push(
          <Tab route={route.push(i)}
               name={character.name}
               active={i == activeTab}
               key={`${data.type}_${character.id}`}
               baseUrl={baseUrl}
               index={i}/>
        );
        if (i == activeTab) {
          console.log(character.coin);
          portal = (
            <Character {...character}
                       onChat={onChat}
                       send={this.sendCharacter}
                       me={me}/>
          )
        }
      }
      else if (data.type == TAB_TYPES.CREW) {
        let crew = data.crew;
        tabDoms.push(
          <Tab route={route.push(i)}
               active={i == activeTab}
               name={crew.name}
               key={`${data.type}_${crew.id}`}
               baseUrl={baseUrl}
               index={i}/>
        )
        if (i == activeTab) {
          portal = (
            <Crew crew={crew}
                  onChat={onChat}/>
          )
        }
      }
    }
    return (
      <Container>
        <OptionsMenu route={route} on={options} auth={auth}/>
        <DiceRoller onChat={onChat}/>
        <Portal>
          {portal}
        </Portal>
        <Tabs>
          {tabDoms}
        </Tabs>
      </Container>
    );
  }
}

export default Window;
