import React from 'react';
import GameApp from 'games/game-app.js';
import Cable from 'api/cable.js';
import Chatbox from './chatbox.js';
import Window from './window.js';
import { ACTIONS } from 'games/world-of-adventure/enums.js';
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
        bonus: data.bonus,
        result: data.result,
        date: new Date(data.timestamp)
      }
      this.props.logEvent(event);
    }
    else {
      this.props.processEvent(data);
    }
  }
  roll(bonus) {
    this.props.perform("roll", {bonus: bonus, request: 0});
  }
  handleChat(message) {
    message = message.trim();
    if (message) {
      if (message[0] == '/') {
        let re = /\/r(oll)?(\s*?(\+|-|−)\s*?(\d+))?/g;
        let result = re.exec(message);
        if (result) {
          let bonus = 0;
          if (result.length == 5) {
            bonus = parseInt(result[4]);
            if (result[3] != '+') {
              bonus *= -1;
            }
          }
          return this.roll(bonus);
        }
      }
      this.props.onTalk(message);
    }
  }
  render() {
    let window = (
      <div id='world-of-adventure'>
        <Window onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                options={true}/>
        <Chatbox chats={this.props.events}
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
