import React from 'react';
import styled from 'styled-components';

import GameApp from 'games/common/app';
import Chatbox from './chatbox';
import Window from './window';
import Colors from 'games/world-of-adventure/colors'
import { ACTIONS } from 'games/world-of-adventure/enums';

const Container = styled.div`
  ${Colors.stripesBackground(.5, .5, .2, 20)};
`

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  processEvent(data) {
    if (data.action == ACTIONS.ROLL) {
      let event = {
        id: data.id,
        action: 'roll',
        player: this.props.players[data.player],
        bonus: data.bonus,
        result: data.result,
        date: new Date(data.timestamp)
      }
      return event
    }
    else {
      return this.props.processEvent(data);
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
      <Container>
        <Window onChat={this.handleChat.bind(this)}
                route={this.props.route}
                auth={this.props.auth}
                options={true}/>
        <Chatbox events={this.props.events}
                 playerHash={this.props.playerHash}
                 onChat={this.handleChat.bind(this)}/>
      </Container>
    );
    return (
      <GameApp auth={this.props.auth}
               game={this.props.game}
               window={window}
               onConnect={this.props.onConnect}
               onLoad={this.props.onLoad}
               processEvent={this.processEvent.bind(this)}
               logEvents={this.props.logEvents}/>
    );
  }
}

export default App;
