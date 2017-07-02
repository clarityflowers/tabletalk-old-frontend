import React from 'react';
import ReactDOM from 'react-dom';
import rx from 'resplendence';

import Details from './details';
import GameTypeList from './game-type-list';
import NewGameForm from './new-game-form';

import Link from 'utils/link';
import { GameTypes } from 'utils/enums';

rx`
@import "~common/colors";
@import "~common/fonts";
`

const Container = rx('div')`
  max-width: 100%;
  background-color: $details-background;
  color: $details-color;
  box-shadow: $boxShadow;
  font: $h1;
  font-size: 20px;
  position: relative;
  overflow: hidden;
  top: 0;
  transition-property: top, height;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0.7,-0.3,0.3,1.1);
  &.off {
    top: 100vh;
  }
`
const Content = rx('div')`
  padding: 1em;
  height: auto;
  z-index: 1;
`

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      off: true,
      height: 100,
      showInput: false,
      formMode: (this.props.game.id == 'new' && this.props.game.type != null),
      joining: false
    };
    this.timeout = null;
    this.content = null;
  }
  setTimeout(resolve, duration) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(resolve, duration);
  }
  enter(callback) {
    this.setState({
      off: false
    });
    this.setTimeout(() => {
      callback();
    }, 700);
  }
  leave(callback) {
    this.setState({
      off: true
    });
    this.setTimeout(() => {
      callback();
    }, 700);
  }
  componentWillAppear(callback) {
    this.setTimeout(() => {
      this.enter(callback);
    }, 1500);
  }
  componentWillEnter(callback) {
    this.setTimeout(() => {
      this.enter(callback);
    }, 1500);
  }
  componentWillLeave(callback) {
    this.leave(callback);
  }
  updateHeight(resolve) {
    let height = 300;
    if ((!this.state.formMode || this.props.game.players.length) && this.content) {
      let {scrollHeight} = this.content;
      height = scrollHeight;
    }
    if (height != this.state.height) {
      this.setState({height: height});
      if (resolve) {
        setTimeout(resolve, 700);
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.game.type == null && this.props.game.type != null) {
      setTimeout(this.updateHeight.bind(this), 700);
    }
    if (
      (prevProps.game.id == 'new' && this.props.game.id != 'new') ||
      (prevProps.game.me == null && this.props.game.me != null)
    ) {
      this.setState({
        formMode: false,
        joining: false
      });
    }
    if (prevProps.game.players.length != this.props.game.players.length) {
      this.updateHeight();
    }
  }
  handleSubmit(key, value, id) {
    this.props.updateGame({[key]: value, id: id});
    if (key == 'join') {
      this.setState({joining: true});
    }
  }
  componentDidMount() {
    this.updateHeight();
  }
  activateForm() {
    this.setState({formMode: true});
  }
  handleGameTypeClick(index) {
    this.props.updateGame({type: index});
    this.activateForm();
  }
  handleJoin() {
    this.activateForm();
  }
  render() {
    const { game, route } = this.props;
    const { formMode, joining, off,  height } = this.state;
    const style = {
      height: height
    }
    let content = null;
    if (game.id != 'new') {
      content = (
        <Details route={route} onJoin={this.handleJoin.bind(this)}
                 game={game}/>
      )
    }
    else {
      content = (
        <GameTypeList onClick={this.handleGameTypeClick.bind(this)}/>
      );
    }
    return (
      <Container rx={{off}} style={style}>
        <NewGameForm off={!formMode} game={game} joining={joining}
                     onSubmit={this.handleSubmit.bind(this)}/>
        <Content innerRef={e => this.content = e}>
          {content}
        </Content>
      </Container>
    );
  }
}

export default GameDetails;
