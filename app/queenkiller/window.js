import React from 'react';
import styled from 'styled-components';

import Lobby from './lobby/lobby';
import Intro from './intro';
import EnterName from './enter-name';
import Attractive from './attractive';
import Despise from './despise';
import Killer from './killer';
import WaitKiss from './wait-kiss';
import Main from './main';
import KissWho from './kiss-who';
import ReallyClaim from './really-claim';
import Claimed from './claimed';
import Kissed from './kissed';

const Container = styled.div`
  background-color: black;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: .4em;
    padding: 1em;
  }
  ::-webkit-scrollbar-track {
    -webkit-border-radius: 1em;
    border-radius: 1em;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1em;
    border-radius: 1em;
    background: white;
  }
  font-size: 20px;
  color: white;
`

class Window extends React.PureComponent {
  render() {
    const { players, characters, time, times, phase, ready, me, mine, who, kiss } = this.props;
    var character = null;
    var display = null;
    if (phase == null) {
      display = (
        <Lobby players={players} characters={characters} me={me}/>
      )
    }
    else if (phase == 'intro') {
      display = (
        <Intro ready={ready}/>
      );
    }
    else if (phase == 'name') {
      let name = null;
      if (characters[mine]) { name = characters[mine].name; }
      display = (
        <EnterName name={name}/>
      );
    }
    else if (phase == 'attractive') {
      display = (
        <Attractive characters={characters} me={mine} ready={ready}/>
      );
    }
    else if (phase == 'despise') {
      display = (
        <Despise characters={characters} me={mine} ready={ready}/>
      );
    }
    else if (phase == 'role') {
      display = (
        <Killer killer={characters[mine].killer} ready={ready}/>
      );
    }
    else if (kiss) {
      display = (
        <WaitKiss name={characters[kiss].name}/>
      );
    }
    else if (phase == 'play') {
      display = (
        <Main characters={characters}/>
      );
    }
    else if (phase == 'kiss who') {
      display = (
        <KissWho characters={characters} me={mine}/>
      )
    }
    else if (phase == 'kill who') {

    }
    else if (phase == 'really claim') {
      display = (
        <ReallyClaim/>
      )
    }
    else if (phase == 'claimed') {
      display = (
        <Claimed character={characters[who]}/>
      );
    }
    else if (phase == 'kissed') {
      display = (
        <Kissed character={characters[who]}/>
      )
    }
    return (
      <Container>
        {display}
      </Container>
    )
  }
}

const { object, number, string } = React.PropTypes;
Window.propTypes = {
  players: object.isRequired,
  characters: object.isRequired,
  time: number.isRequired,
  times: number.isRequired,
  phase: string,
  me: number
};

export default Window;
