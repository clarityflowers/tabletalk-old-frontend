import React from 'react';
import rUpdate from 'react-addons-update';

import GameApp from 'games/common/app.js';
import Chatbox from './chatbox.js';
import Window from './window.js';
import { ACTIONS, TAB_TYPES } from 'games/blades-in-the-dark/enums.js';

import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: {}
    }
    this.updates = {};
  }
  processUpdate(data, key) {
    if (key in this.updates) { return; }
    this.updates[key] = true;
    const copy = (base, mod) => {
      let result = null;
      if (Array.isArray(base)) {
        result = base.slice(0);
        if (mod) {
          if (mod.add) {
            result.push(mod.add);
          }
          else if (mod.remove) {
            i = result.indexOf(mod.remove);
            if (i >= 0) {
              result.splice(i,1);
            }
          }
        }
      }
      else if (typeof base == "object") {
        result = {};
        const props = Object.keys(base);
        for (let i=0; i < props.length; i++) {
          const prop = props[i];
          const modValue = mod[prop];
          const value = base[prop];
          if (prop in mod) {
            result[prop] = copy(value, modValue);
          }
          else {
            result[prop] = value;
          }
        }
      }
      else {
        result = mod;
      }
      return result;
    }
    if (data) {
      const { character } = data;
      if (character) {
        const id = character.id;
        delete character.id;
        let base = this.state.characters[id];
        let x = {};
        let result = copy(base, character);
        const characters = rUpdate(this.state.characters, {
          [id]: {$set: result}
        });
        this.setState({characters});
      }
    }
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
    else if (event.action == ACTIONS.UPDATE) {
      this.processUpdate(event.data, event.key);
      const logs = event.logs;
      if (logs) {
        let result = [];
        for (let i=0; i < logs.length; i++) {
          result.push(this.processEvent(logs[i]));
        }
        return result;
      }
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
      const { characters } = data;
      if (characters) {
        const ids = Object.keys(characters);
        let newCharacters = rUpdate(this.state.characters, {
          $merge: characters
        });
        this.setState({characters: newCharacters});
      }
    }
  }
  update(data) {
    const key = this.props.perform(ACTIONS.UPDATE, {data});
    this.processUpdate(data, key);
  }

  render() {
    let tabs = [
      {
        type: TAB_TYPES.CREW,
        crew: {
          name: 'The Quicksilver Crew',
          id: 13,
          playbook: 'Shadows'
        }
      }
    ];
    if (this.state.characters[1]) {
      tabs.push({
        type: TAB_TYPES.CHARACTER,
        character: this.state.characters[1]
      })
    }
    const me = this.props.players ? this.props.players.me : null;
    let window = (
      <div id='blades-in-the-dark'>
        <Window route={this.props.route}
                tabs={tabs}
                onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                game={this.props.game}
                options={true}
                update={this.update.bind(this)}
                me={me}/>
        <Chatbox events={this.props.events}
                 playerHash={this.props.playerHash}
                 onChat={this.handleChat.bind(this)}/>
      </div>
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
