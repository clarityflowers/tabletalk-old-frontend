import React from 'react';
import update from 'react-addons-update';
import { HoverWiggle } from 'utils/hover-animate.js';
import './options-menu.scss';

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      clicked: 0,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let {scrollWidth, innerText} = this.refs.label;
    if (scrollWidth != this.state.width) {
      this.setState({width: scrollWidth});
    }
  }
  mouseEnter() {
    this.props.mouseEnter(this.props.name);
  }
  mouseLeave() {
    this.props.mouseLeave(this.props.name);
  }
  clickTimeout() {
    this.setState({
      clicked: this.state.clicked - 1
    });
  }
  click() {
    // clearTimeout(this.state.firstClickTimeout);
    // clearTimeout(this.state.secondClickTimeout);
    // let firstClickTimeout = setTimeout(this.clickTimeout.bind(this), 150);
    // let secondClickTimeout = setTimeout(this.clickTimeout.bind(this), 1000);
    // this.setState({
    //   clicked: 2,
    //   firstClickTimeout: firstClickTimeout,
    //   secondClickTimeout: secondClickTimeout
    // });
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
              onMouseLeave={this.mouseLeave.bind(this)}>
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
              mouseLeave={props.mouseLeave}/>
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
  let className='';
  if (props.isHovering) {
    className='anim-wiggle';
  }
  return (
    <button onClick={props.onClick}
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
      isToggling: 0,
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
      name: 0,
      signout: 0,
      toggle: 0
    }
  }
  toggle() {
    this.setState({
      open: !this.state.open,
      isToggling: 3
    });
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
    this.props.onSignOut();
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
