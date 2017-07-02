import React from 'react';
import styled from 'styled-components';

import Join from './join';
import CommonButton from 'common/button';

const Button = styled(cz(CommonButton, 'ready'))`
  color: white;
  display: block;
`

import cz from 'utils/styled-classes';
import connect from 'utils/connect';

const Container = styled.div`
`
const Player = styled(cz('div', 'ready'))`
  color: white;
  &.ready {
    color: red;
  }
`
const List = 'div';

class Lobby extends React.PureComponent {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }
  start() {
    const { dispatch } = this.props;
    dispatch('start');
  }
  render() {
    const { players, characters, me } = this.props;
    const playersKeys = Object.keys(players);
    const playersCopy = {};
    for (let i=0; i < playersKeys.length; i++) {
      const id = playersKeys[i];
      const player = players[id];
      if (id != "me") {
        const name = player.name;
        const ready = false;
        const id = player.id;
        playersCopy[id] = {name, ready, id};
      }
    }
    const characterIds = Object.keys(characters);
    let ready = false;
    for (let i=0; i < characterIds.length; i++) {
      const id = characterIds[i];
      const character = characters[id];
      playersCopy[character.player].ready = true;
      console.log(character.player, me);
      if (character.player == me) {
        ready = true;
      }
    }
    const playerIds = Object.keys(playersCopy);
    const list = [];
    var canGo = true;
    for (let i=0; i < playerIds.length; i++) {
      const id = playerIds[i];
      const player = playersCopy[id];
      list.push(
        <Player ready={player.ready} key={player.id}>{player.name}</Player>
      );
      if (!player.ready) {
        canGo = false;
      }
    }
    var start = null;
    if (canGo) {
      start = (
        <Button onClick={this.start}>=>Go</Button>
      )
    }
    return (
      <Container>
        <List>
          {list}
        </List>
        <Join ready={ready}/>
        {start}
      </Container>
    )
  }
}

const { object, number, func } = React.PropTypes;
Lobby.propTypes = {
  players: object.isRequired,
  characters: object.isRequired,
  me: number
};

export default connect(Lobby);
