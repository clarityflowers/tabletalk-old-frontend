import React from 'react';
import rx from 'resplendence';
import {
  kindsById
} from "common/gameKinds";

rx`
@import "~common/styles";
`

const Container = rx('button')`
  color: black;
  display: block;
  width: 100%;
  background: transparent;
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .1), -1px 1px 1px 1px hsla(0, 0%, 0%, .1) inset;
  margin: 20px 0;
  min-width: 300px;
  flex: 1 0 260px;
  border: 15px solid white;
  transition: box-shadow .15s, margin .15s, width .15s;

  @include game-kind-header;

  &:hover, &:focus {
    margin: 20px -5px;
    width: calc(100% + 10px);
    box-shadow: -2px 2px 2px 2px hsla(0, 0%, 0%, .3), -1px 1px 3px 3px hsla(0, 0%, 0%, .3) inset;
    outline: none;
    cursor: pointer;
  }
`


class Game extends React.Component {
  handleClick = () => {
    const { id, openGame } = this.props;
    openGame(id);
  }
  render() {
    const { name, kind } = this.props;
    return (
      <Container onClick={this.handleClick} rx={kindsById[kind]}>
        {name}
      </Container>
    )
  }
}

export default Game;