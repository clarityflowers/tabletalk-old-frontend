import React from 'react';
import styled from 'styled-components';

import List from './list';
import OptionsMenu from 'options/options-menu';

import Colors from 'common/colors';
import cz from 'utils/styled-classes';

const { boxShadow, balloons } = Colors;

const Container = styled(cz('div', 'off'))`
  z-index: 7;
  background-color: ${balloons};
  position: absolute;
  overflow-y: scroll;
  width: 100%;
  min-height: 100vh;
  left: 0;
  display: flex;
  justify-content: center;
  flex: none;
  top: -10vh;
  margin-top: 10vh;
  padding: 10vh 0 10vh 0;
  box-shadow: ${boxShadow};
  transition: top .7s cubic-bezier(0.730, -0.300, 0.375, 1.360);
  &.off {
    top: -200vh;
  }
`

class ListPanel extends React.Component {
  shouldComponentUpdate(newProps) {
    if (
      newProps.off !== this.props.off || (
        !newProps.off && (
          newProps.games !== this.props.game ||
          newProps.game !== this.props.game ||
          !newProps.route.equals(this.props.route) ||
          newProps.leaving !== this.props.leaving ||
          newProps.online !== this.props.online ||
          newProps.target !== this.props.target ||
          newProps.auth.online !== this.props.online ||
          newProps.auth.name !== this.props.auth.name ||
          newProps.options !== this.props.options
        )
      )
    ) {
      return true;
    }
    return false;
  }
  render() {
    const {
      off, games, route, creatingNewGame, game, leaving,
      auth, options,
      onDoneLeaving, onUpdateGameDetails
    } = this.props;
    return (
      <Container off={off}>
          <List games={games} route={route} creatingNewGame={creatingNewGame}
                online={auth.online} game={game}
                onDoneLeaving={onDoneLeaving}
                leaving={leaving}
                onUpdateGameDetails={onUpdateGameDetails}/>
          <OptionsMenu route={route}
                       auth={auth}
                       on={options}/>
      </Container>
    )
  }
}

const { bool, array, object, func } = React.PropTypes;
ListPanel.propTypes = {
  off: bool.isRequired,
  games: array.isRequired,
  route: object.isRequired,
  creatingNewGame: bool.isRequired,
  game: object,
  leaving: bool.isRequired,
  auth: object.isRequired,
  options: bool.isRequired,
  onDoneLeaving: func.isRequired,
  onUpdateGameDetails: func.isRequired
}

export default ListPanel;
