'use strict';

import React from 'react';
import styled from 'styled-components';
import update from 'react-addons-update';

import GameApp from 'common/app';
import Window from './window';
import Dispatcher from 'utils/dispatcher';
import reduce from './reduce';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: {
      },
      time: 0,
      times: [
        {
          min: 0,
          max: 0
        }
      ],
      phase: 'lobby',
      ready: false,
      mine: null,
      who: null,
      kiss: null
    }
    this.handleLoad = this.handleLoad.bind(this);
    this.send = this.send.bind(this);
    this.process = this.process.bind(this);
    this.keys = {};
  }
  handleLoad(args) {
    console.log('load', args);
    this.props.onLoad(args);
    const {characters, phase, started, mine, kiss} = args.data;
    this.setState({
      characters, phase, started, mine, kiss
    })
  }
  send(action, data) {
    console.log('send', action, data);
    const key = this.props.perform("do", {what: action, data});
    this.process({action, data, key});
  }
  process({action, data, key}) {
    const { players } = this.props;
    console.log('process', action, data, key);
    if (this.keys[key] == action) {
      this.keys[key] = null;
      return;
    }
    this.keys[key] = action;
    const me = players ? players.me : null;
    const reduced = reduce(action, data, this.state, me.id);
    if (reduced == null) { return; }
    const state = update(this.state, reduced);
    console.log(reduced, state);
    this.setState(state);
  }
  render() {
    const { players } = this.props;
    const { characters, time, times, phase, ready, mine, who, kiss } = this.state;
    const me = players ? players.me : null;
    let window = (
      <Dispatcher dispatch={this.send}>
        <Window players={players} characters={characters}
                time={time} times={times.length} phase={phase}
                me={me ? me.id : null} ready={ready} mine={mine} who={who} kiss={kiss}/>
      </Dispatcher>
    );
    return (
      <GameApp auth={this.props.auth}
               game={this.props.game}
               window={window}
               onConnect={this.props.onConnect}
               onLoad={this.handleLoad}
               processEvent={this.process}/>
    );
  }
}

export default App;
