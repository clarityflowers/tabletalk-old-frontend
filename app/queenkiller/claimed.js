import React from 'react';
import rx from 'resplendence';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = 'div'
const Button = rx(CommonButton)`--1
  color: white;
  display: block;
`
const Innocent = 'p';
const Red = rx('p')`
  color: red;
`

class Claimed extends React.PureComponent {
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
    if (character.worthy) {
      return (
        <Container>
          <p>{character.name} has touched the crown and been deemed Crown-Worthy!</p>
          <Button onClick={this.return}>=>Incredible!</Button>
        </Container>
      )
    }
    return (
      <Container>
        <Red>Alas, {character.name} was not worthy, and was slain by the crown.</Red>
        <Button onClick={this.return}>=>A shame</Button>
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
Claimed.propTypes = {
  dispatch: func.isRequired
};

export default connect(Claimed);
