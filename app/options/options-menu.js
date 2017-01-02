import React from 'react';
import { browserHistory } from 'react-router';
import update from 'react-addons-update';
import { HoverWiggle } from 'utils/hover-animate.js';
import './options-menu.scss';

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateWidth();
  }
  updateWidth() {
    let {scrollWidth, innerText} = this.refs.label;
    if (scrollWidth != this.state.width) {
      this.setState({width: scrollWidth});
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWidth.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this));
  }
  mouseEnter() {
    this.props.onMouseEnter(this.props.index);
  }
  mouseLeave() {
    this.props.onMouseLeave(this.props.index);
  }
  click() {
    this.mouseLeave();
    this.props.onClick();
  }
  render() {
    let style = {
      width: 0,
      left: 0
    }
    if (this.props.on) {
      style.width = this.state.width;
      if (this.props.isToggling) {
        style.left = 10;
      }
      else if (this.props.isHovering) {
        style.left = -10;
      }
    }
    return (
      <div className='label-container' style={style}>
        <div  className='label'
              ref='label'
              onClick={this.click.bind(this)}
              onMouseEnter={this.mouseEnter.bind(this)}
              onMouseLeave={this.mouseLeave.bind(this)}
              onTouchMove={this.mouseLeave.bind(this)}>
          {this.props.text}
        </div>
      </div>
    )
  }
}

const OptionsButton = (props) => {
  let mouseEnter = () => {
    props.onMouseEnter(props.index);
  }
  let mouseLeave = () => {
    props.onMouseLeave(props.index);
  }
  let click = () => {
    mouseLeave();
    props.onClick();
  }
  let className='';
  if (props.isHovering) {
    className='anim-wiggle';
  }
  return (
    <button onClick={click}
            className={className}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}>
      {props.glyph}
    </button>
  )
}

const Divider = () => {
  return (
    <div className='divider'></div>
  )
}

const ANIM_TIMES = [200, 600];

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hovering: null,
      hoverAnim: [0, 0, 0, 0]
    };
    this.timeouts = [];
  }
  componentWillUnmount() {
  }
  toggle() {
    this.setState({open: !this.state.open});
  }
  signout() {
    this.setState({open: false});
    this.props.auth.signOut();
    browserHistory.push('/');
  }
  goHome() {
    this.setState({open: false});
    browserHistory.push('/games');
  }
  safeTimeout(key, time, cb) {
    clearTimeout(this.timeouts[key]);
    this.timeouts[key] = setTimeout(() => {
      cb(key);
    }, time);
  }
  animate(key) {
    let step = this.state.hoverAnim[key];
    if (step < ANIM_TIMES.length) {
      this.safeTimeout(key, ANIM_TIMES[step], this.animate.bind(this));
    }
    let hoverAnim = update(this.state.hoverAnim, {
      [key]: {$set: step + 1}
    });
    this.setState({hoverAnim: hoverAnim});
  }
  handleMouseEnter(key) {
    if (this.state.hoverAnim[key] > 0) {
      let hoverAnim = update(this.state.hoverAnim, {
        [key]: {$set: -1}
      });
      this.setState({hoverAnim: hoverAnim});
      this.safeTimeout(key, 70, this.animate.bind(this));
    }
    else {
      this.animate(key);
    }
    this.setState({hovering: key});

  }
  handleMouseLeave(key) {
    if (this.state.hovering == key) {
      this.setState({hovering: null});
    }
  }
  render() {
    let className = 'hidden';
    if (this.props.auth.online && this.props.on) {
      if (this.state.open) {
        className = 'open';
      }
      else {
        className = 'closed';
      }
    }
    let options = [
      {
        text: this.props.auth.name,
        glyph: 'u',
        onClick: this.toggle.bind(this),
        on: this.props.auth.online && this.props.on
      },
      {
        text: 'Signout',
        glyph: 'p',
        onClick: this.signout.bind(this),
        on: this.state.open
      },
      {
        text: 'Home',
        glyph: 'h',
        onClick: this.goHome.bind(this),
        on: this.state.open
      },
    ];
    let labels = [];
    let buttons = [];
    for (let i=0; i < options.length; i++) {
      let option = options[i];
      let index = i;
      if (i == 0 && !this.state.open) {
        index = options.length
      }
      let labelIsHovering = (
        (this.state.hoverAnim[index] >= 0 && this.state.hovering == index) ||
        (this.state.hoverAnim[index] == 1)
      );
      let buttonIsHovering = (
        (this.state.hoverAnim[i] >= 0 && this.state.hovering == i) ||
        (this.state.hoverAnim[i] >= 1)
      );
      labels.push(
        <Label key={i}
               index={index}
               text={option.text}
               on={option.on}
               isToggling={false}
               isHovering={labelIsHovering}
               onMouseEnter={this.handleMouseEnter.bind(this)}
               onMouseLeave={this.handleMouseLeave.bind(this)}
               onClick={option.onClick}/>
      );
      buttons.push(
        <OptionsButton onClick={option.onClick}
                       key={i}
                       index={i}
                       isHovering={buttonIsHovering}
                       onMouseEnter={this.handleMouseEnter.bind(this)}
                       onMouseLeave={this.handleMouseLeave.bind(this)}
                       glyph={option.glyph}/>
      );
    }
    buttons.push(
      <Divider key='divider'/>
    );
    let isHovering = (
      (
        this.state.hoverAnim[options.length] >= 0 &&
        this.state.hovering == options.length
      ) ||
      this.state.hoverAnim[options.length] >= 1
    )
    buttons.push(
      <OptionsButton onClick={this.toggle.bind(this)}
                     key={options.length}
                     index={options.length}
                     isHovering={isHovering}
                     onMouseEnter={this.handleMouseEnter.bind(this)}
                     onMouseLeave={this.handleMouseLeave.bind(this)}
                     glyph='g'/>
    );
    return (
      <div id='optionsMenu' className={className}>
        <div className='labels'>
          {labels}
        </div>
        <div className='banner'>
          {buttons}
        </div>
      </div>
    )
  }
}

export default OptionsMenu
