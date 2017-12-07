import { connect } from 'react-redux';

import Games from './Games';

import { goTo } from 'Routing/actionCreators';
import { getGames, getGame } from './actionCreators';

const mapStateToProps = ({games}, {path, here}) => ({
  ...games,
  path,
  here
})

const mapDispatchToProps = {goTo, getGames, getGame};

export default connect(mapStateToProps, mapDispatchToProps)(Games);