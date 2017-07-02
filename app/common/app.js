import React from 'react';
import rx from 'resplendence';

import CableApi from 'api/cable';
import Game from 'api/game';
import { MOBILE_BREAKPOINT } from 'blades/common/constants';

const Container = rx('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  align-items: stretch;
  pointer-events: auto;
  overflow: hidden;
  position: fixed;
  overflow: none;
  > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      align-items: stretch;
      pointer-events: auto;
      box-sizing: border-box;
      @media only screen and (max-width: 800px) {
        padding-top: 32px;
      }
  }
`

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
    const result = this.props.processEvent(data);
    if (result && this.props.logEvents) {
      this.props.logEvents(result);
    }
  }
  /* ---------- load ---------------------------------------------------------*/
  load(args) {
    const { players, me, data } = args;
    if (players) {
      this.props.onLoad({players, me, data});
    }
    if (data && data.chats && this.props.processEvent && this.props.logEvents) {
      const chats = data.chats;
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
      <Container>
        {this.props.window}
      </Container>
    );
  }
}

App.propTypes = {
  game: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  onLoad: React.PropTypes.func.isRequired,
  logEvents: React.PropTypes.func,
  onConnect: React.PropTypes.func.isRequired,
  processEvent: React.PropTypes.func

}

export default App;
