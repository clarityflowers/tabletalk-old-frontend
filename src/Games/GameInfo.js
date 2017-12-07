import React from 'react';
import rx from 'resplendence';
import {
  kindsById
} from "common/gameKinds";

rx`
@import "~common/styles";
@import "~common/colors";
`


const Container = rx('div')`
  @include card;
  padding: 15px;
  color: black;
  display: flex;
  flex-flow: column;
`

const Header = rx('div')`
  @include game-kind-header;
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .1) inset;
`

const Players = rx('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Player = rx('li')`
  color: black;
  font-family: "Junction";
  font-size: 20px;
  margin: 10px;  
  color: darken($background-1, 10%);
`

const PlayerIcon = rx('span')`
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 3px 2px 0 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 22px;
  border-radius: 25px;
  background: transparent;
  font-family: "Icomoon";
  position: relative;
  top: 2px;
  &.me {
    background: darken($background-1, 10%);
    color: white;
  }
`

const PlayerName = rx('span')`
  margin-left: 10px;
`

const EnterButton = rx('button')`
  @include button;
  display: block;
  align-self: center;
  margin: 10px;
  font-family: "League Spartan";
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, .1);
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .3);
  background: $background-1;
  color: white;
  font-size: 20px;
  padding: 7px 7px 2px 7px;
`


class GameInfo extends React.Component {
  render() {
    const { name, kind, players, playersById, me, startGame } = this.props;
    const playerComponents = players.map(id => {
      const { name, admin } = playersById[id];
      return (
        <Player key={id}>
          <PlayerIcon rx={{me: (me === id)}}>{admin ? "u" : "u"}</PlayerIcon>
          <PlayerName>{name}</PlayerName>
        </Player>
      )
    });
    return (
      <Container>
        <Header rx={kindsById[kind]}>{name}</Header>
        <EnterButton rx={kindsById[kind]} onClick={startGame}>{(me === null) ? "Join" : "Enter"}</EnterButton>
        <Players>
          {playerComponents}
        </Players>
      </Container>
    )
  }
}

export default GameInfo;