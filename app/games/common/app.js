import React from 'react';
import CableApi from 'api/cable.js';
import Game from 'api/game.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  /* ---------- lifecycle ----------------------------------------------------*/
  componentDidMount() {
    let cable = new CableApi(this.props.game.type, this.props.game.id, {
      connected: this.handleConnect.bind(this),
      rejected: this.handleReject.bind(this),
      received: this.handleReceive.bind(this)
    })
    let channel = cable.channel;
    this.props.onConnect(channel.perform.bind(channel));
  }
  /* ---------- handlers -----------------------------------------------------*/
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
    this.props.processEvent(data);
  }
  /* ---------- load ---------------------------------------------------------*/
  load(data) {
    let players = data.players;
    if (players) {
      this.props.onLoad(players);
    }
    let chats = data.chats;
    if (chats) {
      for (let i=0; i < chats.length; i++) {
        this.props.processEvent(chats[i]);
      }
    }
  }
  /* ---------- render ---------------------------------------------------------*/
  render() {
    return (
      <div id='game-app'>
        {this.props.window}
      </div>
    );
  }
}

export default App;
