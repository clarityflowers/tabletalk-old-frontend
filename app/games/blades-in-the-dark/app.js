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
      characters: {
        13: {
          id: 13,
          names: {
            name: 'Qarin',
            playbook: 'Spider',
            alias: '???',
          },
          look: 'Pensive, impish',
          heritage: 'Dusker/Slave',
          background: 'UNDERWORLD/MILITARY- Stole and cheated way up to Acehood (Diamonds), then joined the Khans army and served as a Strategos, “Stuff Happened,” deserted and have returned home to Amar-Khadim.',
          vice: 'Gambling',
          strangeFriends: [
            {
              name: 'Neba Blood (Miss Blood)',
              position: 'Jack of Hearts',
              description: 'A former friend (former lover). Etoli.',
              friend: false
            },
            {
              name: 'Zopheea',
              position: 'cat-burglar',
              description: 'Narri/Whisper. Notorious. Hiding out in the Tin Quarter.',
              friend: true
            }
          ],
          health: {
            stress: 2,
            trauma: ['Cold', 'Haunted'],
            healing: {
              unlocked: false,
              clock: 0,
            },
            harm: {
              severe: '',
              moderate1: '',
              moderate2: '',
              moderate3: '',
            },
            armor: {
              normal: false,
              heavy: false,
              special: []
            },
          },
          specialAbilities: [
            {
              name: 'Foresight',
              description: 'Three times per score you can assist another rogue without paying stress. Tell us how you prepared them for the situation',
            }
          ],
          stats: {
            playbookXP: 0,
            hunt: 0,
            study: 1,
            survey: 2,
            tinker: 0,
            finesse: 1,
            prowl: 2,
            skirmish: 0,
            wreck: 0,
            attune: 0,
            command: 0,
            consort: 2,
            sway: 0,
            insightXP: 0,
            prowessXP: 5,
            resolveXP: 2,
            money: {
              coin: 1,
              stash: 17,
            },
          },
          equipment: {
            load: 3,
            items: [
              {
                name: 'A blade or two',
                load: 1,
                used: false
              },
              {
                name: 'Throwing Knives',
                load: 1,
                used: true
              },
              {
                name: 'A Large Weapon',
                load: 2,
                used: false
              },
              {
                name: 'Fine cover identity',
                load: 0,
                used: true
              }
            ]
          }
        }
      }
    };
    this.updates = {};
  }
  processUpdate(data, key) {
    if (key in this.updates) { return; }
    this.updates[key] = true;
    const copy = (base, mod) => {
      let result = mod;
      if (typeof base == "object") {
        result = {};
        const props = Object.keys(base);
        for (let i=0; i < props.length; i++) {
          const prop = props[i];
          const modValue = mod[prop];
          if (prop in mod) {
            const value = base[prop];
            result[prop] = copy(value, modValue);
          }
          else {
            result[prop] = base[prop];
          }
        }
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
    console.log(event);
    if (event.action == ACTIONS.ROLL) {
      let roll = {
        id: event.id,
        action: ACTIONS.ROLL,
        player: this.props.players[event.player],
        level: event.bonus,
        result: event.result,
        date: new Date(event.timestamp)
      }
      this.props.logEvent(roll);
    }
    if (event.action == ACTIONS.UPDATE) {
      this.processUpdate(event.data, event.key);
    }
    else {
      this.props.processEvent(event);
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
  update(data) {
    console.log('UPDATE', data);
    const key = this.props.perform(ACTIONS.UPDATE, {data});
    this.processUpdate(data, key);

  }
  render() {
    let tabs = [
      {
        type: TAB_TYPES.CHARACTER,
        character: this.state.characters[13]
      },
      {
        type: TAB_TYPES.CREW,
        crew: {
          name: 'The Quicksilver Crew',
          id: 13,
          playbook: 'Shadows'
        }
      }
    ];
    let window = (
      <div id='blades-in-the-dark'>
        <Window route={this.props.route}
                tabs={tabs}
                onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                game={this.props.game}
                options={true}
                update={this.update.bind(this)}/>
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
               onLoad={this.props.onLoad}
               processEvent={this.processEvent.bind(this)}/>
    );
  }
}

export default App;
