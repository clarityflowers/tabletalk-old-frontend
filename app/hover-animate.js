// libraries
import React from 'react';
// style
import './hover-animate.scss'



class HoverAnimate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false
    }
  }
  animationEnd(event) {
    let name = 'anim-' + this.props.animationName;
    if (event.animationName == name) {
      this.setState({
        animate: false
      });
    }
  }
  hover() {
    if (this.props.off) {
      return;
    }
    if (this.state.animate) {
      this.setState({
        animate: false
      });
      setTimeout(() => {
        this.setState({
          animate: true
        });
      }, 70);
    }
    else {
      this.setState({
        animate: true,
      });
    }
  }
  render() {
    let className = 'anim';
    if (this.state.animate) {
      className += '-' + this.props.animationName;
    }
    return (
      <div  className={className}
            onMouseEnter={this.hover.bind(this)}
            onAnimationEnd={this.animationEnd.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}

export const HoverBuzz = (props) => {
  return (
    <HoverAnimate animationName='buzz' off={props.off}>{props.children}</HoverAnimate>
  );
}

export const HoverWiggle = (props) => {
  return (
    <HoverAnimate animationName='wiggle' off={props.off}>{props.children}</HoverAnimate>
  );
}

export default HoverAnimate
