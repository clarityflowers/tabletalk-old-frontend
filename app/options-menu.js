import React from 'react';
import { browserHistory } from 'react-router';
import { HoverWiggle } from './hover-animate.js';
import './options-menu.scss';

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      hover: 0,
      clicked: 0,
      timeouts:=
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let {scrollWidth, innerText} = this.refs.label;
    if (scrollWidth != this.state.width) {
      this.setState({width: scrollWidth});
    }
  }
  mouseEnter() {
    this.setState({hover: 2});
    setTimeout(() => {
      this.setState({hover: this.state.hover - 1});
    }, 150);
  }
  mouseLeave() {
    this.setState({hover: this.state.hover - 1});
  }
  clickTimeout() {
    timeouts = this.state.timeouts;
    timeouts.shift();
    this.setState({
      clicked: this.state.clicked - 1,
      timeouts:
    });
  }
  click() {
    clearTimeout(this.state.timeouts[0]);
    clearTimeout(this.state.timeouts[1]);
    let timeout = setTimeout(this.clickTimeout.bind(this), 150);
    this.setState({
      clicked: 2,
      timeout: timeout
    });
    this.props.onClick();
  }
  render() {
    let style = {
      width: 0,
      left: 0
    }
    if (!this.props.hidden) {
      style.width = this.state.width;
      if (this.state.clicked > 1) {
        style.left = 10;
      }
      else if (this.state.clicked == 0 && this.state.hover > 0) {
        style.left = -10;
      }
    }
    return (
      <div className='label-container' style={style} id={this.props.id}>
        <div  className='label'
              ref='label'
              id={this.props.id}
              onClick={this.click.bind(this)}
              onMouseEnter={this.mouseEnter.bind(this)}
              onMouseLeave={this.mouseLeave.bind(this)}>
          {this.props.text}
        </div>
      </div>
    )
  }
}

const Labels = (props) => {
  return (
    <div className='labels'>
      <Label  hidden={!props.loggedIn || !props.name}
              text={props.name}
              id='name'
              onClick={props.open ? props.goToUserSettings : props.toggle}/>
      <Label  hidden={!props.open}
              text='Sign off'
              id='logout'
              onClick={props.signout}/>
    </div>
  )
}

const OptionsButton = (props) => {
  return (
    <HoverWiggle>
      <button onClick = {props.onClick}>{props.children}</button>
    </HoverWiggle>
  )
}

const Divider = () => {
  return (
    <div className='divider'></div>
  )
}

const Banner = (props) => {
  return (
    <div className='banner'>
      <OptionsButton onClick={props.toggle}>g</OptionsButton>
      <Divider>g</Divider>
      <OptionsButton onClick={props.signout}>p</OptionsButton>
      <OptionsButton onClick={props.goToUserSettings}>u</OptionsButton>
    </div>
  )
}

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  signout() {
    this.setState({open: false});
    this.props.onSignOut();
  }
  goToUserSettings() {
    // TODO
    this.toggle();
  }
  render() {
    let className = 'hidden';
    if (this.props.loggedIn) {
      if (this.state.open) {
        className = 'open';
      }
      else {
        className = 'closed';
      }
    }
    return (
      <div id='optionsMenu' className={className}>
        <Labels
          name={this.props.name}
          loggedIn={this.props.loggedIn}
          open={this.state.open}
          signout={this.signout.bind(this)}
          toggle={this.toggle.bind(this)}
          goToUserSettings={this.goToUserSettings.bind(this)}
        />
        <Banner
          signout={this.signout.bind(this)}
          toggle={this.toggle.bind(this)}
          goToUserSettings={this.goToUserSettings.bind(this)}
        />
      </div>
    )
  }
}

export default OptionsMenu
