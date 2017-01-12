import React from 'react';
import CableApi from 'api/cable.js';
import Game from 'api/game.js';
import './app.scss';

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
    console.log("recieving data:", data);
    const result = this.props.processEvent(data);
    this.props.logEvents(result);
  }
  /* ---------- load ---------------------------------------------------------*/
  load(args) {
    const { players, me, chats, data } = args;
    if (players) {
      this.props.onLoad({players, me, data});
    }
    if (chats) {
      let result = [];
      for (let i=0; i < chats.length; i++) {
        const processResult = this.props.processEvent(chats[i]);
        if (processResult != undefined) {
          result.push(processResult);
        }
      }
      result = result.reduce( ( acc, cur ) => acc.concat(cur), [] ); //flatten
      this.props.logEvents(result);
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
