import React from 'react';
import GameApp from 'games/common/app.js';
import Chatbox from './chatbox.js';
import Window from './window.js';
import { ACTIONS } from 'games/blades-in-the-dark/enums.js';
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
    let window = (
      <div id='blades-in-the-dark'>
        <Window onChat={this.handleChat.bind(this)}
                route={this.props.route}
                auth={this.props.auth}
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
