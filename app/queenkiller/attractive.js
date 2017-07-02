import React from 'react';
import rx from 'resplendence';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = 'div';
const Button = rx(CommonButton)`--1
  color: white;
`

class Attractive extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ready = this.ready.bind(this);
  }
  ready() {
    const { dispatch } = this.props;
    dispatch('ready');
  }
  render() {
    const { characters, me, ready } = this.props;
    const ids = Object.keys(characters);
    let character = null;
    let names = [];
    for (let i=0; i < ids.length; i++) {
      const id = ids[i];
      if (id == me) {
        character = characters[ids[(i + 1) % ids.length]];
      }
      names.push(characters[id].name);
    }
    let button = null;
    if (!ready) {
      button = (
        <p>
          <Button onClick={this.ready}>=>Continue</Button>
        </p>
      );
    }
    return (
      <Container>
        <p>The characters are: {names.join(", ")}</p>
        <p>Say what you find attractive about {character.name}</p>
        {button}
      </Container>
    )
  }
}

const { object, number, func } = React.PropTypes;
Attractive.propTypes = {
  characters: object.isRequired,
  me: number.isRequired,
  dispatch: func.isRequired
};

export default connect(Attractive);
