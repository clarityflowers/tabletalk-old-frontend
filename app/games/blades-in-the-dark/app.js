import React from 'react';
import GameApp from 'games/common/app.js';
import Chatbox from './chatbox.js';
import Window from './window.js';
import { ACTIONS, TAB_TYPES } from 'games/blades-in-the-dark/enums.js';
import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  processEvent(data) {
    if (data.action == ACTIONS.ROLL) {
      let event = {
        id: data.id,
        action: ACTIONS.ROLL,
        player: this.props.playerHash[data.player],
        level: data.bonus,
        result: data.result,
        date: new Date(data.timestamp)
      }
      this.props.logEvent(event);
    }
    else {
      this.props.processEvent(data);
    }
  }
  roll(level) {
    this.props.perform("roll", {level: level, request: 0});
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
  render() {
    let tabs = [
      {
        type: TAB_TYPES.CHARACTER,
        character: {
          name: 'Qarin',
          id: 13,
          playerbook: 'Spider'
        }
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
                activeTab={0}
                onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                game={this.props.game}
                options={true}/>
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
