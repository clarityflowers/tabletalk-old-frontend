'use strict'

import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import Game from './game/game.js';
import GameDetails from './game-details/game-details';
import Back from './back';

const Container = styled.div`
  width: 100%;
  padding: 0 8em 0 8em;
  max-width: 850px;
`
const ListTransition = styled(ReactTransitionGroup)`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`

class List extends React.Component {
  constructor(props) {
    super(props);
    this.gamesDoneLeaving = 0;
    this.onGameDoneLeaving = this.onGameDoneLeaving.bind(this);
  }
  onGameDoneLeaving() {
    const { games, leaving, online, onDoneLeaving } = this.props;
    this.gamesDoneLeaving++;
    let finalValue = games.length;
    if (
      (leaving || !online) &&
      this.gamesDoneLeaving >= finalValue
    ) {
      setTimeout(() => {
        if (onDoneLeaving) {
          onDoneLeaving()
        }
      }, 0);
    }
  }
  game(i) {
    const { games, game, route, creatingNewGame } = this.props;
    const data = this.props.games[i];
    const selected = !!(game && game.id == data.id);
    return (
      <Game route={this.props.route}
            name={data.name}
            key={data.id}
            gameId={data.id}
            doneLeaving={this.onGameDoneLeaving}
            selected={selected}
            type={data.type}
            transition={!creatingNewGame}>
      </Game>
    )
  }
  render() {
    const {
      games, game, route, leaving, online,
      onUpdateGameDetails, target
    } = this.props;
    const hideBackButton = (
      !game ||
      leaving ||
      games.length == 0
    );
    const showDetails = (
      game &&
      !leaving &&
      online
    );
    let details = null;
    let items = [];
    for (let i=0; i < games.length; i++) {
      let item = games[i];
      if (item.isVisible) {
        items.push(this.game(i));
      }
    }
    if (showDetails) {
      details = (
        <GameDetails route={route.next()}
                     updateGame={onUpdateGameDetails}
                     game={game}/>
      );
    }
    return (
      <Container>
        <Back route={route} off={hideBackButton}/>
        <ListTransition component='div'>
          {items}
        </ListTransition>
        <ReactTransitionGroup component='div' className='children'>
          {details}
        </ReactTransitionGroup>
      </Container>
    )
  }
}

const { array, object, bool, func, string } = React.PropTypes;
List.PropTypes = {
    games: array.isRequired,
    game: object.isRequirerd,
    route: object.isRequired,
    leaving: bool.isRequired,
    online: bool.isRequired,
    onUpdateGameDetails: func.isRequired,
    target: string.isRequired
};

export default List;
