'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
`

const Container = rx('div')`
  width: 1em;
  margin: 0 .5em;
`
const Svg = rx('svg')`
  -webkit-filter: drop-shadow($textShadow);
  filter: drop-shadow($textShadow);
  -webkit-svg-shadow: $textShadow;
`
const Polygon = rx('polygon')`
  fill: darken($stone, 15%);
`
const FriendTriangle = rx(Polygon)`
  stroke: $sky;
`
const EnemyTriangle = rx(Polygon)`
  stroke: $fire;
`

class Friend extends React.PureComponent {
  render() {
    return (
      <FriendTriangle strokeWidth="10" points="5,100 105,100, 55,40"/>
    )
  }
}

class Enemy extends React.PureComponent {
  render() {
    return (
      <EnemyTriangle strokeWidth="10" points="5,40 105,40, 55,100"/>
    )
  }
}

class Favorite extends React.PureComponent {
  render() {
    return (
      <FriendTriangle strokeWidth="10" points="105,65 45,25 45,105"/>
    )
  }
}

class Triangle extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Svg x="0px"
           y="0px"
           preserveAspectRatio="none"
           width="1em"
           height="1em"
           viewBox="0 0 110 110">
        {children}
      </Svg>
    )
  }
}

class Icon extends React.PureComponent {
  render() {
    const { isFriend, isFavorite } = this.props;
    let triangle = null;
    if (isFavorite) {
      triangle = <Favorite/>
    }
    else if (isFriend) {
      triangle = <Friend/>
    }
    else if (isFriend === false){
      triangle = <Enemy/>
    }
    return (
      <Container>
        <Triangle>
          {triangle}
        </Triangle>
      </Container>
    );
  }
}

const { bool } = React.PropTypes;
Icon.propTypes = {
  isFriend: bool,
  isFavorite: bool
}

export default Icon;
