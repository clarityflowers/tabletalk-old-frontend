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
    this.props.mouseEnter(this.props.name);
  }
  mouseLeave() {
    this.props.mouseLeave(this.props.name);
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
    if (!this.props.hidden) {
      style.width = this.state.width;
      if (this.props.isToggling) {
        style.left = 10;
      }
      else if (this.props.isHovering) {
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
              onMouseLeave={this.mouseLeave.bind(this)}
              onTouchMove={this.mouseLeave.bind(this)}>
          {this.props.text}
        </div>
      </div>
    )
  }
}

const Labels = (props) => {
  let nameHover = props.open ? props.isHovering.name : props.isHovering.toggle;
  let nameName = props.open ? 'name' : 'toggle';
  let nameOnClick = props.open ? props.goToUserSettings : props.toggle;
  return (
    <div className='labels'>
      <Label  hidden={!props.loggedIn || !props.name}
              text={props.name}
              id='name'
              name={nameName}
              onClick={nameOnClick}
              isHovering={nameHover}
              mouseEnter={props.mouseEnter}
              mouseLeave={props.mouseLeave}
              isToggling={props.isToggling}/>
      <Label  hidden={!props.open}
              text='Sign off'
              id='signout'
              name='signout'
              onClick={props.signout}
              isHovering={props.isHovering.signout}
              mouseEnter={props.mouseEnter}
              mouseLeave={props.mouseLeave}/>
    </div>
  )
}

const OptionsButton = (props) => {
  let mouseEnter = () => {
    props.mouseEnter(props.name);
  }
  let mouseLeave = () => {
    props.mouseLeave(props.name);
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
      {props.children}
    </button>
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
      <OptionsButton  onClick={props.toggle}
                      name="toggle"
                      isHovering={props.isHovering.toggle}
                      mouseEnter={props.mouseEnter}
                      mouseLeave={props.mouseLeave}>
        g
      </OptionsButton>
      <Divider>g</Divider>
      <OptionsButton  onClick={props.signout}
                      name="signout"
                      isHovering={props.isHovering.signout}
                      mouseEnter={props.mouseEnter}
                      mouseLeave={props.mouseLeave}>
        p
      </OptionsButton>
      <OptionsButton  onClick={props.goToUserSettings}
                      name="name"
                      isHovering={props.isHovering.name}
                      mouseEnter={props.mouseEnter}
                      mouseLeave={props.mouseLeave}>
        u
      </OptionsButton>
    </div>
  )
}

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isToggling: false,
      name: {
        isHovering: false,
        animationStep: 0
      },
      signout: {
        isHovering: false,
        animationStep: 0
      },
      toggle: {
        isHovering: false,
        animationStep: 0
      }
    }
    this.timeouts = {
      name: null,
      signout: null,
      toggle: null,
      toggling: null
    }
  }
  endToggle() {
    this.setState({
      isToggling: false
    })
  }
  toggle() {
    this.setState({
      open: !this.state.open,
      isToggling: true
    });
    this.safeTimeout('toggling',150,this.endToggle.bind(this));
  }
  hoverAnimationStepThree(key) {
    this.setState({[key]: update(this.state[key], {
      animationStep: {$set: 0},
    })});
  }
  hoverAnimationStepTwo(key) {
    this.safeTimeout(key, 600, this.hoverAnimationStepThree.bind(this));
    this.setState({[key]: update(this.state[key], {
      animationStep: {$set: 2},
    })});
  }
  hoverAnimationStepOne(key) {
    this.safeTimeout(key, 200, this.hoverAnimationStepTwo.bind(this));
    this.setState({[key]: update(this.state[key], {
      animationStep: {$set: 1},
    })});
  }
  safeTimeout(key, time, cb) {
    clearTimeout(this.timeouts[key]);
    this.timeouts[key] = setTimeout(() => {
      cb(key);
    }, time);
  }
  mouseEnter(key) {
    let option = this.state[key];
    if (option.animationStep > 0) {
      option = update(option, {
        animationStep: {$set: -1}
      })
      this.safeTimeout(key, 70, this.hoverAnimationStepOne.bind(this));
    }
    else {
      this.safeTimeout(key, 0, this.hoverAnimationStepOne.bind(this));
    }
    option = update(option, {
      isHovering: {$set: true}
    });
    this.setState({[key]: option});
  }
  mouseLeave(key) {
    let option = update(this.state[key], {
      isHovering: {$set: false}
    });
    this.setState({[key]: option});
  }
  signout() {
    this.setState({open: false});
    this.props.auth.signOut();
    browserHistory.push('/');
  }
  goToUserSettings() {
    this.toggle();
  }
  calcLabelHover(key) {
    let result = false
    if (this.state[key].animationStep != -1) {
      if (this.state[key].isHovering) {
        result = true;
      }
      else if (this.state[key].animationStep == 1) {
        result = true;
      }
    }
    return result;
  }
  calcButtonHover(key) {
    let result = false
    if (this.state[key].animationStep != -1) {
      if (this.state[key].isHovering) {
        result = true;
      }
      else if (this.state[key].animationStep > 0) {
        result = true;
      }
    }
    return result;
  }
  componentWillUnmount() {
    clearTimeout(this.timeouts.name);
    clearTimeout(this.timeouts.toggle);
    clearTimeout(this.timeouts.signout);
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
    return (
      <div id='optionsMenu' className={className}>
        <Labels
          name={this.props.auth.name}
          loggedIn={this.props.auth.online && this.props.on}
          open={this.state.open}
          signout={this.signout.bind(this)}
          mouseEnter={this.mouseEnter.bind(this)}
          mouseLeave={this.mouseLeave.bind(this)}
          toggle={this.toggle.bind(this)}
          isHovering={{
            name: this.calcLabelHover('name'),
            toggle: this.calcLabelHover('toggle'),
            signout: this.calcLabelHover('signout'),
          }}
          isToggling={this.state.isToggling}
          goToUserSettings={this.goToUserSettings.bind(this)}
        />
        <Banner
          signout={this.signout.bind(this)}
          toggle={this.toggle.bind(this)}
          mouseEnter={this.mouseEnter.bind(this)}
          mouseLeave={this.mouseLeave.bind(this)}
          isHovering={{
            name: this.calcButtonHover('name'),
            toggle: this.calcButtonHover('toggle'),
            signout: this.calcButtonHover('signout'),
          }}
          goToUserSettings={this.goToUserSettings.bind(this)}
        />
      </div>
    )
  }
}

export default OptionsMenu
