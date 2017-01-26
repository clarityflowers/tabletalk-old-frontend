import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Colors from 'common/colors';
import Fonts from 'common/fonts';
import Link from 'utils/link';
import { HoverWiggle } from 'utils/hover-animate';
import { GameTypes } from 'utils/enums';

const Container = styled.div`
  padding: 1em;
  height: auto;
  z-index: 1;
`
const Header = styled.div`
  padding: 1em;
  text-align: center;
`

const Details = (props) => {
  const { route, onJoin, game } = props;
  let players = [];
  for (let i=0; i < game.players.length; i++) {
    let player = game.players[i];
    let icon = 'u';
    if (player.admin) {
      icon = '*';
    }
    let iconClass = cx(
      'icon',
      {
        me: game.me == player.id
      }
    )
    players.push(
      <li className='player' key={player.name}>
        <span className={iconClass}>{icon}</span>
        <span className='name'>
          {player.name}
        </span>
      </li>
    )
  }
  let playerCount = game.players.length + ' ';
  if (game.maxPlayers) {
    playerCount += 'of ' + game.maxPlayers + ' player';
    if (game.maxPlayers > 1) {
      playerCount += 's';
    }
  }
  else {
    playerCount += 'player';
    if (game.players.length > 1) {
      playerCount + 's';
    }
  }
  let button = (
    <Link route={route.push('go')} className='enter'>Enter</Link>
  );
  if (game.me == null) {
    button = (
      <button className='join'  onClick={onJoin.bind(this)}>
        Join
      </button>
    );
  }
  return (
    <Container>
      <Header>
        <HoverWiggle>
          {button}
        </HoverWiggle>
      </Header>
      <div className='details'>
        <div className='type'>
          {game.type ? GameTypes[game.type].name : ''}
        </div>
        <div className='players'>
          <h1>{playerCount}</h1>
          <ul>{players}</ul>
        </div>
      </div>
    </Container>
  )
}

Details.propTypes = {
  route: React.PropTypes.object.isRequired,
  onJoin: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired
}

export default Details;
