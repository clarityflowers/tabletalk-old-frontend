import React from 'react';
import Cable from 'api/cable.js';
import Chatbox from './chat.js';
import Window from './window.js';
import './app.scss';

const ACTIONS = {
  TALK: 0,
  ROLL: 1
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerHash: {},
      events: []
    };
    this.cable = null;
  }
  componentDidMount() {
    this.setState({players: this.props.game.players});
    this.cable = new Cable(this.props.game.type, this.props.game.id, {
      connected: this.handleConnect,
      rejected: this.handleReject.bind(this),
      received: this.handleReceive.bind(this)
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.players.length != this.state.players.length) {
      this.updatePlayerHash();
    }
  }
  handleConnect() {
    console.log('Connected to cable!');
  }
  handleReject() {
    console.error('Cable rejected!');
    this.props.auth.signOut();
  }
  handleReceive(data) {
    console.log('received data...');
    console.log(data);
    if (data.action == ACTIONS.TALK) {
      console.log(this.state.playerHash)
      event = {
        id: data.id,
        chat: {
          player: this.state.playerHash[data.player],
          message: data.message
        }
      }
      this.logEvent(event)
    }
    else if (data.action == ACTIONS.ROLL) {
      event = {
        id: data.id,
        chat: {
          player: this.state.playerHash[data.player],
          roll: {
            bonus: data.bonus,
            result: data.result
          }
        }
      }
      this.logEvent(event);
    }
  }
  updatePlayerHash() {
    let playerHash = {}
    for (let i=0; i < this.state.players.length; i++) {
      let player = this.state.players[i]
      playerHash[player.id] = player;
      if (player.me) {
        playerHash.me = player;
      }
    }
    this.setState({playerHash: playerHash});
  }
  logEvent(event) {
    event.id = Math.floor(Math.random() * 10000000);
    this.setState((state) => {
      let events = state.events.slice(0);
      events.push(event);
      return {events: events};
    })
  }
  talk(message) {
    this.cable.channel.perform("talk", {message: message, request: 0});
  }
  roll(bonus) {
    this.cable.channel.perform("roll", {bonus: bonus, request: 0});
  }
  handleChat(message) {
    message = message.trim();
    if (message) {
      if (message[0] == '/') {
        let re = /\/roll(\s*?(\+|-|−)\s*?(\d+))?/g;
        let result = re.exec(message);
        if (result) {
          let bonus = 0;
          if (result.length == 4) {
            bonus = parseInt(result[3]);
            if (result[2] != '+') {
              bonus *= -1;
            }
          }
          return this.roll(bonus);
        }
      }
      this.talk(message);
    }
  }
  render() {
    return (
      <div id='world-of-adventure'>
        <Window onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                options={true}/>
        <Chatbox events={this.state.events}
              playerHash={this.state.playerHash}
              onChat={this.handleChat.bind(this)}/>
      </div>
    )
  }
}

export default App;
