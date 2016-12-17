import React from 'react';
import Cable from 'api/cable.js';
import Chatbox from './chatbox.js';
import Window from './window.js';
import { ACTIONS } from 'games/blades-in-the-dark/enums.js';
import Game from 'api/game.js';
import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerHash: {},
      chats: []
    };
    this.cable = null;
    this.chatHash = {};
  }
  componentDidMount() {
    this.setState({players: this.props.game.players});
    this.cable = new Cable(this.props.game.type, this.props.game.id, {
      connected: this.handleConnect.bind(this),
      rejected: this.handleReject.bind(this),
      received: this.handleReceive.bind(this)
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.players.length != this.state.players.length) {
      this.updatePlayerHash();
    }
  }
  load(data) {
    console.log(data);
    let chats = data.chats
    if (chats) {
      for (let i=0; i < chats.length; i++) {
        this.processChat(chats[i]);
      }
    }
  }
  processChat(data) {
    if (data.action == ACTIONS.TALK) {
      let chat = {
        id: data.id,
        action: ACTIONS.TALK,
        player: this.state.playerHash[data.player],
        message: data.message,
        date: new Date(data.timestamp)
      }
      this.chat(chat)
    }
    else if (data.action == ACTIONS.ROLL) {
      console.log('ROLL');
      console.log(data.result);
      let chat = {
        id: data.id,
        action: ACTIONS.ROLL,
        player: this.state.playerHash[data.player],
        level: data.bonus,
        result: data.result,
        date: new Date(data.timestamp)
      }
      console.log(chat);
      this.chat(chat);
    }
  }
  handleConnect() {
    console.log('Connected to cable!');
    let reject = ({code, error}) => {
      if (code == 401) {
        this.props.auth.signOut();
      }
      console.error(`ERROR ${code}: ${error}`);
    }
    Game.load({game: this.props.game.id}, this.load.bind(this), reject);
  }
  handleReject() {
    console.error('Cable rejected!');
    this.props.auth.signOut();
  }
  handleReceive(data) {
    this.processChat(data);
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
  chat(chat) {
    let index = null;
    if (chat.id in this.chatHash) {
      index = this.chatHash[chat.id];
    }
    if (index) {
      this.setState((state) => {
        let chats = state.chats.slice(0);
        chats[index] = chat;
        return {chats: chats};
      })
    }
    else {
      this.setState((state) => {
        let chats = state.chats.slice(0);
        if (chats.length && chat.date >= chats[chats.length -1].date) {
          chats.push(chat);
        }
        else {
          let i = chats.length - 1;
          while(i > 0 && chat.date < chats[i-1].date) {
            i--;
          }
          chats.splice(i, 0, chat);
        }
        return {chats: chats};
      })
    }
  }
  talk(message) {
    this.cable.channel.perform("talk", {message: message, request: 0});
  }
  roll(level) {
    this.cable.channel.perform("roll", {level: level, request: 0});
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
      this.talk(message);
    }
  }
  render() {
    return (
      <div id='blades-in-the-dark'>
        <Window onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                options={true}/>
        <Chatbox chats={this.state.chats}
              playerHash={this.state.playerHash}
              onChat={this.handleChat.bind(this)}/>
      </div>
    )
  }
}

export default App;
