import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'utils/link.js';
import cx from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { GameTypes } from 'utils/enums.js';
import './game-details.scss';
import { HoverBuzz, HoverWiggle } from 'utils/hover-animate.js';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      off: true,
      loading: false,
      show: this.props.game.id == 'new',
      height: 100,
      formValue: '',
      showInput: false,
      formMode: (this.props.game.id == 'new' && this.props.game.type != null),
      joining: false
    };
    this.timeout = null;
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
    if ((!this.state.formMode || this.props.game.players.length) && this.refs.content) {
      let {scrollHeight} = this.refs.content;
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
    if (prevState.loading && !this.state.loading) {
      let resolve = () => {
        this.setState({show: true});
      }
      this.updateHeight(resolve);
    }
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
  componentDidMount() {
    this.updateHeight();
  }
  activateForm() {
    this.setState({formMode: true});
    setTimeout(() => {
      this.setState({showInput: true});
      ReactDOM.findDOMNode(this.refs.input).focus();
    }, 700);
  }
  handleGameTypeClick(index) {
    this.props.updateGame({type: index});
    this.activateForm();
  }
  handleJoin() {
    this.activateForm();
  }
  handleFormChange(event) {
    this.setState({formValue: event.target.value.substr(0, 25)});
  }
  handleFormSubmit(key, event) {
    event.preventDefault();
    this.props.updateGame({
      [key]: this.state.formValue,
      id: this.props.game.id
    });
    this.setState({showInput: false});
    if (key == 'name') {
      this.setTimeout(() => {
        this.setState({
          formValue: '',
          showInput: true
        });
      }, 1100);
    }
    if (key == 'join') {
      this.setState({joining: true});
    }
  }
  render() {
    let game = this.props.game;
    let loadingClassName = cx(
      'loading',
      {
        off: this.state.show
      }
    );
    let formClassName = cx(
      'form',
      {
        off: !this.state.formMode
      }
    );
    let style = {};
    let content = null;
    if (game.id != 'new') {
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
        <Link route={this.props.route.push('go')} className='enter'>Enter</Link>
      );
      if (game.me == null) {
        button = (
          <button className='join'  onClick={this.handleJoin.bind(this)}>
            Join
          </button>
        );
      }
      content = (
        <div>
          <div className='header'>
            <HoverWiggle>
              {button}
            </HoverWiggle>
          </div>
          <div className='details'>
            <div className='type'>
              {game.type ? GameTypes[game.type].name : ''}
            </div>
            <div className='players'>
              <h1>{playerCount}</h1>
              <ul>{players}</ul>
            </div>
          </div>
        </div>
      )
    }
    else {
      let gameTypes = [];
      for (let i=0; i < GameTypes.length; i++) {
        gameTypes.push(
          <HoverBuzz key={i}>
          <button className={`game-type ${GameTypes[i].className}`}
          onClick={this.handleGameTypeClick.bind(this, i)}>
          {GameTypes[i].name}
          </button>
          </HoverBuzz>
        )
      }
      let showInput = false;
      let subContent = null;
      if (game.type == null || this.state.show) {
        content = (
          <div>
            <div className='header'>
              Choose a game
            </div>
            <div className='game-type-list'>
              {gameTypes}
            </div>
          </div>
        )
      }
    }
    let key = 'loading';
    if (game.name == null) {
      key = 'name';
    }
    else if (game.players.length == 0) {
      key = 'player';
    }
    else if (game.me == null && !this.state.joining) {
      key = 'join';
    }
    let coverClassName = cx(
      'cover',
      {
        off: this.state.showInput
      }
    )
    let text = '';
    if (key == 'name') {
      text = 'Enter a name for the game';
    }
    else if (key == 'player' || key == 'join') {
      text = "What's your name?"
    }
    else if (key == 'loading'){
      text = 'Loading...';
    }
    let label = (
      <div className='label' key={key}>
        <label>{text}</label>
      </div>
    )
    style = {
      height: this.state.height
    }
    let className = cx(
      'game-details',
      {
        off: this.state.off
      }
    );
    return (
      <div className={className} style={style}>
        <div className={formClassName}>
          <form onSubmit={this.handleFormSubmit.bind(this, key)}>
            <CSSTransitionGroup transitionName="anim"
                                transitionEnterTimeout={1100}
                                transitionLeaveTimeout={1100}
                                component='div'
                                className='transition'>
              {label}
            </CSSTransitionGroup>
            <div className={cx('input', {off: !this.state.showInput})}>
              <input type='text'
                     value={this.state.formValue}
                     onChange={this.handleFormChange.bind(this)}
                     ref='input'/>
              <div className={coverClassName}/>
              <input type='submit' value='>' className={cx({off: !this.state.showInput})}/>
            </div>
          </form>
        </div>

        <div  className='content' ref='content'>
          {content}
        </div>
      </div>
    );
  }
}

export default GameDetails;
