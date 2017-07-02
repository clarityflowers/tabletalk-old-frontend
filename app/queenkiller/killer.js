import React from 'react';
import rx from 'resplendence';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = 'div'
const Button = rx(CommonButton)`--1
  color: white;
`
const Innocent = 'p';
const Murderous = rx('p')`
  color: red;
`

class Killer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ready = this.ready.bind(this);
  }
  ready() {
    const { dispatch } = this.props;
    dispatch('ready');
  }
  render() {
    const { killer, ready } = this.props;
    let text = (
      <Innocent>You are innocent.</Innocent>
    );
    if (killer) {
      text = (
        <Murderous>You are the Queen-Killer.</Murderous>
      );
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
        {text}
        {button}
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
Killer.propTypes = {
  killer: bool.isRequired,
  dispatch: func.isRequired
};

export default connect(Killer);
