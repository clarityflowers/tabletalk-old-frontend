import React from 'react';
import rx from 'resplendence';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = 'div';
const Button = rx(CommonButton)`--1
  color: white;
  display: block;
`
const Innocent = 'p';
const Red = rx('p')`
  color: red;
`

class Kissed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.return = this.return.bind(this);
  }
  return() {
    const { dispatch } = this.props;
    dispatch('navigate', 'play');
  }
  render() {
    const { character } = this.props;
    if (character.killer && character.worthy) {
      return (
        <Container>
          <Red>In your moment of bliss, you saw into {character.name}'s soul and revealed a awesome secret: they are Crown-Worthy AND Queen-Killer!</Red>
          <Button onClick={this.return}>=>O Lady Above!</Button>
        </Container>
      )
    }
    else if (character.killer) {
      return (
        <Container>
          <Red>However sweet their lips may be, you saw into {character.name}'s soul and discovered the terrible truth: they are the Queen-Killer!</Red>
          <Button onClick={this.return}>=>Surely they had a good reason</Button>
        </Container>
      )
    }
    else if (character.worthy) {
      return (
        <Container>
          <p>Your connection with {character.name} has revealed to you something not even they know: they are worthy of the crown!</p>
          <Button onClick={this.return}>=>Incredible!</Button>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <p>You share a single beautiful moment with {character.name}.</p>
          <Button onClick={this.return}>=>If only it lasted longer</Button>
        </Container>
      )
    }
  }
}

const { bool, func } = React.PropTypes;
Kissed.propTypes = {
  dispatch: func.isRequired
};

export default connect(Kissed);
