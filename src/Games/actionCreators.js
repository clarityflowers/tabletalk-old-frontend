import {
  GAMES_START_LOADING,
  GAMES_SET_LIST,
  GAMES_ADD,
  GAMES_FAIL_LOADING
} from "common/actions"
import actionCreator from 'utils/actionCreator';
import api from './api';

const startLoadingGames = actionCreator(GAMES_START_LOADING);
const setGamesList = actionCreator(GAMES_SET_LIST, "list");
const addGames = actionCreator(GAMES_ADD, "gamesById", "playersById");
const failLoadingGames = actionCreator(GAMES_FAIL_LOADING)

const mapGames = games => {
  const list = [];
  const gamesById = {};
  const playersById = {};
  for (let i=0; i < games.length; i++) {
    const { id, kind, maxPlayers, name, players, me } = games[i];
    list.push(id);
    const game = { kind, maxPlayers, name, me, players: [] };
    for (let j=0; j < players.length; j++) {
      const { id, name, admin } = players[j];
      playersById[id] = { id, name, admin };
      game.players.push(id);
    }
    gamesById[id] = game;
  }
  return {list, gamesById, playersById};
}

export const getGames = () => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(startLoadingGames());
  api.index(auth.jwt)
    .then(games => {
      const {list, gamesById, playersById} = mapGames(games);
      dispatch(addGames({gamesById, playersById}));
      dispatch(setGamesList({list}));
    })
    .catch(err => dispatch(failLoadingGames()));
}

export const getGame = ({id}) => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(startLoadingGames());
  api.get(id, auth.jwt)
    .then(game => {
      const {gamesById, playersById} = mapGames([game]);
      dispatch(addGames({gamesById, playersById}));
    })
    .catch(err => {
      console.error(err);
      dispatch(failLoadingGames());
    });
}