import React from 'react';
import rx from 'resplendence';

import GameListItem from './GameListItem';
import GameInfo from './GameInfo';
import Spinner from 'common/components/Spinner';

import { exactMatch } from 'utils/pathTools';
import expired from 'utils/expired';

rx`
@import "~common/styles";
`

const Container = rx('div')`
  position: relative;
  width: 100%;
  max-width: 800px;
`

const Title = rx('div')`
  @include card;
  font-family: "Marvin Visions";
  color: #B24592;
  font-size: 80px;
  margin: 10px 0;
  text-align: center;
`

const ReturnButton = rx('button')`
  @include button;
  font-family: "Icomoon";
  position: absolute;
  display: block;
  top: 40px;
  left: 20px;
  color: #B24592;
  font-size: 40px;
`




class GamesList extends React.Component {
  render() {
    const { games, openGame} = this.props;
    const gameComponents = games.map((game) => <GameListItem key={game.id} kind={game.kind} id={game.id} name={game.name} openGame={openGame}/>);
    return (
      <div>
        {gameComponents}
      </div>
    )
  }
}


class Games extends React.Component {
  route = () => {
    const { path, list, lastLoaded, error, getGames, getGame } = this.props;
    const currentGame = this.currentGame();
    if (currentGame) {
      getGame({id: currentGame});
    }
    else
    {
      if ((list === null && !error) || expired(lastLoaded, 10)) {
        getGames();
      }
    }
  }
  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (!exactMatch(this.props.path, prevProps.path)) {
      this.route();
    }
  }

  openGame = (id) => {
    const { goTo, here } = this.props;
    goTo([...here, id]);
  }
  return = () => {
    const { goTo, here } = this.props;
    goTo(here);
  }
  currentGame = () => this.props.path.length > 0 ? this.props.path[0] : null;

  startGame = () => {
    const { goTo, gamesById } = this.props;
    const id = this.currentGame();
    const game = gamesById[id];
    if (game.me === undefined) {
      // TODO join game
    }
    else {
      goTo(["play", this.currentGame()]);
    }
  }
  render() {
    const { here, path, list, gamesById, playersById } = this.props;

    let content;
    let returnButton;
    if (list === null || gamesById[this.currentGame()] === undefined) {
      content = <Spinner/>
    }
    else if (path.length === 0) {
      const listGames = list.map(id => {
        const { kind, name } = gamesById[id];
        return {
          id, kind, name
        }
      })
      content = <GamesList openGame={this.openGame} games={listGames}/>
    } 
    else {
      const id = this.currentGame();
      const game = gamesById[id];
      if (game !== undefined) {
        content = <GameInfo {...game} playersById={playersById} startGame={this.startGame}/>
        returnButton = <ReturnButton onClick={this.return}>{"<"}</ReturnButton>
      }

    }

    return (
      <Container>
        <Title>TableTalk</Title>
        {returnButton}
        {content}
      </Container>
    )
  }
}

export default Games;
