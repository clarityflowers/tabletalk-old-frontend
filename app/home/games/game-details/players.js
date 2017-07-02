import React from 'react';
import rx from 'resplendence';

import Player from './player';

rx`
@import "~common/colors";
`

const Container = 'div';
const List = rx('ul')`
  margin: 0;
  list-style: none;
  list-style-type: none;
  padding-left: 1em;
`
const H1 = rx('h1')`
  font-size: 1em;
  border-bottom: .25em solid $details-color;
  margin-bottom: .5em;
`

class Players extends React.Component {
  render() {
    const { players, me, maxPlayers } = this.props;
    let items = [];
    for (let i=0; i < players.length; i++) {
      let player = players[i];
      items.push(
        <Player key={player.name} me={me == player.id}
                 name={player.name} admin={player.admin}/>
      )
    }
    let playerCount = players.length + ' ';
    if (maxPlayers) {
      playerCount += 'of ' + maxPlayers + ' player';
      if (maxPlayers > 1) {
        playerCount += 's';
      }
    }
    else {
      playerCount += 'player';
      if (players.length != 1) {
        playerCount += 's';
      }
    }
    return (
      <Container>
        <H1>{playerCount}</H1>
        <List>{items}</List>
      </Container>
    );
  }
}

const { array, number } = React.PropTypes;
Players.propTypes = {
  players: array.isRequired,
  me: number.isRequired,
  maxPlayers: number
};

export default Players;
