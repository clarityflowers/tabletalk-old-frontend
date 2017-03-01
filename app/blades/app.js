'use strict';

import React from 'react';
import styled from 'styled-components';
import update from 'react-addons-update';

import GameApp from 'common/app';
import Chatbox from './chatbox/chatbox';
import Window from './window/window';
import { ACTIONS, TAB_TYPES } from 'blades/common/enums';
import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { MOBILE_BREAKPOINT } from 'blades/common/constants';

import reduceCharacter from './reducers/character';
import reduceCrew from './reducers/crew';

const Blades = styled.div`
  background-color: ${Colors.stone};
  font: ${Fonts.h1};
  width: 100vw;
  height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: .25em;
    padding: 1em;
  }
  ::-webkit-scrollbar-track {
    -webkit-border-radius: 1em;
    border-radius: 1em;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1em;
    border-radius: 1em;
    background: $stone;
  }
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: {},
      crews: {}
    }
    this.updates = {};
    this.actionKeys = {};
    this.handleChat = this.handleChat.bind(this);
    this.send = this.send.bind(this);
    this.reduce = this.reduce.bind(this);
  }
  reduce(what, data) {
    let result = {};
    if (what == 'character') {
      return reduceCharacter(data);
    }
    if (what == 'crew') {
      return reduceCrew(data);
    }
    return result;
  }
  processAction({what, data, key}) {
    if (key in this.actionKeys) {
      delete this.actionKeys[key];
      return;
    }
    this.actionKeys[key] = true;
    this.setState(this.reduce(what, data));
  }
  processEvent(event) {
    if (event.action == ACTIONS.ROLL) {
      let roll = {
        id: event.id,
        action: ACTIONS.ROLL,
        player: this.props.players[event.player],
        level: event.bonus,
        result: event.result,
        date: new Date(event.timestamp)
      }
      return roll;
    }
    else if (event.action == ACTIONS.DO) {
      this.processAction(event);
      return null;
    }
    else {
      return this.props.processEvent(event);
    }
  }
  roll(level) {
    this.props.perform(ACTIONS.ROLL, {level: level, request: 0});
  }
  handleChat(message) {
    message = message.trim();
    if (message) {
      if (message[0] == '/') {
        let re = /\/r(oll)?(\s*?(\d+))?/g;
        let result = re.exec(message);
        if (result) {
          let level = 0;
          if (result.length == 4) {
            level = parseInt(result[3]);
          }
          return this.roll(level);
        }
      }
      this.props.onTalk(message);
    }
  }
  handleLoad(args) {
    this.props.onLoad(args);
    const { data } = args;
    if (data) {
      const { characters, crews } = data;
      const ids = Object.keys(characters);
      let newCharacters = update(this.state.characters, {
        $merge: characters
      });
      let newCrews = update(this.state.crews, {
        $merge: crews
      })
      this.setState({
        characters: newCharacters,
        crews: newCrews
      });
    }
  }
  send(data) {
    const key = this.props.perform(ACTIONS.DO, data);
    this.processAction({data: data.data, what: data.what, key: key});
  }
  render() {
    const { characters, crews, width } = this.state;
    let tabData = [];
    {
      const keys = Object.keys(characters);
      for (let i=0; i < keys.length; i++) {
        const key = keys[i];
        const character = characters[key];
        tabData.push({
          type: TAB_TYPES.CHARACTER,
          character: character,
          crew: crews[character.crewId]
        })
      }
    }
    {
      const keys = Object.keys(crews);
      for (let i=0; i < keys.length; i++) {
        const key = keys[i];
        const crew = crews[key];
        tabData.push({
          type: TAB_TYPES.CREW,
          crew: crew,
        })
      }
    }
    let ids = Object.keys(characters);
    const me = this.props.players ? this.props.players.me : null;
    let window = (
      <Blades>
        <Window route={this.props.route}
                tabs={tabData}
                onChat={this.handleChat}
                auth={this.props.auth}
                game={this.props.game}
                options={true}
                send={this.send}
                me={me}
                breakpoint={MOBILE_BREAKPOINT}/>
        <Chatbox events={this.props.events}
                 playerHash={this.props.playerHash}
                 onChat={this.handleChat.bind(this)}/>
      </Blades>
    );
    return (
      <GameApp auth={this.props.auth}
               game={this.props.game}
               window={window}
               onConnect={this.props.onConnect}
               onLoad={this.handleLoad.bind(this)}
               processEvent={this.processEvent.bind(this)}
               logEvents={this.props.logEvents}/>
    );
  }
}

export default App;
