import React from 'react';
import styled from 'styled-components';

import Players from './players';
import Button from './button';

import Colors from 'common/colors';
import Fonts from 'common/fonts';
import { GameTypes } from 'utils/enums';

const { color } = Colors.details;

const Container = styled.div`
  padding: 1em;
  height: auto;
  z-index: 1;
`
const Header = styled.div`
  padding: 1em;
  text-align: center;
`
const Body = styled.div`
  width: auto;
  max-width: 300px;
`
const Type = 'div';

const Details = (props) => {
  const { route, onJoin, game } = props;
  return (
    <Container>
      <Header>
        <Button route={route} onJoin={onJoin} present={game.me != null}/>
      </Header>
      <Body>
        <Type>
          {game.type ? GameTypes[game.type].name : ''}
        </Type>
        <Players players={game.players} me={game.me}
                 maxPlayers={game.maxPlayers}/>
      </Body>
    </Container>
  )
}

Details.propTypes = {
  route: React.PropTypes.object.isRequired,
  onJoin: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired
}

export default Details;
