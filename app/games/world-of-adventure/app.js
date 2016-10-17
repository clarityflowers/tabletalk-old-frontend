import React from 'react';
import Chat from './chat.js';
import Window from './window.js';
import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerHash: {},
      events: []
    };
  }
  componentDidMount() {
    let players = [
      {
        name: 'Cerisa',
        id: 6,
        me: true
      },
      {
        name: 'Dimosaur',
        id: 7,
        me: false
      }
    ];
    let events = [
      {
        id: 0,
        chat: {
          player: players[0],
          message: "Hello!"
        }
      },
      {
        id: 1,
        chat: {
          player: players[1],
          message: 'Hey'
        }
      },
      {
        id: 4,
        chat: {
          player: players[0],
          roll: {
            bonus: 2,
            result: [3, 6]
          }
        }
      },
      {
        id: 5,
        chat: {
          player: players[1],
          roll: {
            bonus: -1,
            result: [1, 5]
          }
        }
      },
      {
        id: 2,
        chat: {
          player: players[0],
          message: "What's up"
        }
      },
      {
        id: 7,
        chat: {
          player: players[0],
          roll: {
            bonus: 1,
            result: [4, 2]
          }
        }
      },
      {
        id: 8,
        chat: {
          player: players[0],
          roll: {
            bonus: 1,
            result: [0, 0]
          }
        }
      }
    ];
    this.setState({
      players: players,
      events: events
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.players.length != this.state.players.length) {
      this.updatePlayerHash();
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
          let event = {
            chat: {
              player: this.state.playerHash.me,
              roll: {
                bonus: bonus,
                result: [0, 0]
              }
            }
          }
          return this.logEvent(event);
        }
      }
      let event = {
        chat: {
          player: this.state.playerHash.me,
          message: message
        }
      }
      this.logEvent(event);
    }
  }
  render() {
    return (
      <div id='world-of-adventure'>
        <Window onChat={this.handleChat.bind(this)}
                auth={this.props.auth}
                options={true}/>
        <Chat events={this.state.events}
              playerHash={this.state.playerHash}
              onChat={this.handleChat.bind(this)}/>
      </div>
    )
  }
}

export default App;
