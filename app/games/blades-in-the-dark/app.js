'use strict';

import React from 'react';
import styled from 'styled-components';
import update from 'react-addons-update';

import GameApp from 'games/common/app';
import Chatbox from './chatbox/chatbox';
import Window from './window/window';
import { ACTIONS, TAB_TYPES } from 'games/blades-in-the-dark/common/enums';
import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { MOBILE_BREAKPOINT } from 'games/blades-in-the-dark/common/constants';

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
      tabs: []
    }
    this.updates = {};
    this.actionKeys = {};
    this.handleChat = this.handleChat.bind(this);
    this.send = this.send.bind(this);
  }
  processAction({what, data, key}) {
    if (key in this.actionKeys) {
      delete this.actionKeys[key];
      return;
    }
    this.actionKeys[key] = true;
    let params = {};
    if (what == "character") {
      const { action, id, value } = data;
      if (action == "create") {
      }
      else if (id in this.state.characters) {
        params = {$apply: (c) => {
          let params = {};
          if (action == "increment_stress") {
            if (c.stress < 9) {
              params = {stress: {$set: c.stress + 1}};
            }
          }
          else if (action == "decrement_stress") {
            if (c.stress > 0) {
              params = {stress: {$set: c.stress - 1}};
            }
          }
          else if (action == "add_trauma") {
            params = {
              trauma: {$push: [value]},
              stress: {$set: 0}
            };
          }
          else if (action == "increment_coin") {
            if (c.coin < 4) {
              params = {coin: {$set: c.coin + 1}};
            }
          }
          else if (action == "decrement_coin") {
            if (c.coin > 0) {
              params = {coin: {$set: c.coin - 1}};
            }
          }
          else if (action == "transfer_to_stash") {
            if (c.stash < 40 && c.coin > 0) {
              params = {
                coin: {$set: c.coin - 1},
                stash: {$set: c.stash + 1}
              }
            }
          }
          else if (action == "transfer_to_coin") {
            if (c.stash >= 2 && c.coin < 4) {
              params = {
                coin: {$set: c.coin + 1},
                stash: {$set: c.stash - 2}
              }
            }
          }
          else if (action == "increment_xp") {
            const stat = value.toLowerCase();
            if (stat == 'playbook') {
              if (c.playbookXP < 8) {
                params = {playbookXP: {$set: c.playbookXP + 1}};
              }
            }
            else {
              const prop = stat + 'XP';
              if (c[prop] < 6) {
                params = {[prop]: {$set: c[prop] + 1}};
              }
            }
          }
          else if (action == "decrement_xp") {
            const stat = value.toLowerCase();
            const prop = stat + 'XP';
            if (c[prop] > 0) {
              params = {[prop]: {$set: c[prop] - 1}};
            }
          }
          else if (action == "advance_action") {
            const stat = value.toLowerCase();
            if (c[stat] < 4) {
              let xp = "";
              if (["hunt", "study", "survey", "tinker"].includes(stat)) {
                xp = "insightXP";
              }
              if (["finesse", "prowl", "skirmish", "wreck"].includes(stat)) {
                xp = "prowessXP";
              }
              if (["attune", "command", "consort", "sway"].includes(stat)) {
                xp = "resolveXP";
              }
              params = {
                [stat]: {$set: c[stat] + 1},
                [xp]: {$set: 0}
              };
            }
          }
          else if (action == "edit_harm") {
            const { harm, text } = value;
            const prop = "harm" + harm[0].toUpperCase() + harm.slice(1);
            if (!c[prop] && text) {
              params.healingUnlocked = {$set: false};
            }
            params[prop] = {$set: text};
          }
          else if (action == "use_armor") {
            const { name, used } = value;
            if (name == "armor") {
              params = {armor: {$set: used}};
              if (!used) {
                params.heavyArmor = {$set: false};
              }
            }
            else if (name == "heavy") {
              params = {heavyArmor: {$set: used}};
            }
            else {
              let i = 0;
              while (
                i < c.specialArmor.length &&
                c.specialArmor[i].name != name
              ) {
                i++;
              }
              if (i in c.specialArmor) {
                params = {specialArmor: {[i]: {used: {$set: used}}}};
              }
            }
          }
          else if (action == "unlock_healing") {
            params = {healingUnlocked: {$set: value}};
          }
          else if (action == "increment_healing") {
            if (c.healingClock < 8) {
              params = {healingClock: {$set: c.healingClock + 1}};
            }
            else {
              params = {
                healingClock: {$set: 0},
                harmSevere: {$set: ""},
                harmModerate1: {$set: ""},
                harmModerate2: {$set: ""},
                harmLesser1: {$set: ""},
                harmLesser2: {$set: ""},
                healingUnlocked: {$set: false}
              };
            }
          }
          else if (action == "decrement_healing") {
            if (c.healingClock > 0) {
              params = {healingClock: {$set: c.healingClock - 1}};
            }
          }
          else if (action == "use_item") {
            if (!c.items.includes(value)) {
              let array = [value];
              if (value == "+Heavy" && !c.items.includes("Armor")) {
                array.push("Armor");
              }
              params = {items: {$push: array}};
            }
          }
          else if (action == "clear_item") {
            const index = c.items.indexOf(value);
            if (index >= 0) {
              let items = c.items.slice(0);
              items.splice(index, 1);
              if (value == "Armor") {
                params.armor = {$set: false};
                const index = c.items.indexOf("+Heavy");
                if (index >= 0) {
                  items.splice(index, 1);
                }
              }
              if (value == "+Heavy") {
                params.heavyArmor = {$set: false};
              }
              params.items = {$set: items};
            }
          }
          else if (action == "clear_items") {
            params = {
              items: {$set: []},
              load: {$set: 0},
              armor: {$set: false},
              heavyArmor: {$set: false}
            }
            params.specialArmor = {};
            for (let i=0; i < c.specialArmor.length; i++) {
              params.specialArmor[i] = {used: {$set: false}};
            }
          }
          else if (action == "set_load") {
            params = {load: {$set: value}};
          }
          return update(c, params);
        }};
        params = {[id]: params};
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
      const { characters } = data;
      if (characters) {
        const ids = Object.keys(characters);
        let newCharacters = update(this.state.characters, {
          $merge: characters
        });
        this.setState({
          characters: newCharacters,
          tabs: [{
            type: TAB_TYPES.CHARACTER,
            character: newCharacters[1],
            name: newCharacters[1] ? newCharacters[1].name : ""
          }]
        });
      }
    }
  }
  send(data) {
    const key = this.props.perform(ACTIONS.DO, data);
    this.processAction({data: data.data, what: data.what, key: key});
  }
  render() {
    const { characters, width, tabs } = this.state;
    let ids = Object.keys(characters);
    const me = this.props.players ? this.props.players.me : null;
    let window = (
      <Blades>
        <Window route={this.props.route}
                tabs={tabs}
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
