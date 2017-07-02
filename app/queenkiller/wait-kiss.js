import React from 'react';
import rx from 'resplendence';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = 'div'
const Button = rx(CommonButton)`--1
  color: white;
`

class WaitKiss extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
  }
  cancel() {
    const { dispatch } = this.props;
    dispatch('cancel_kiss');
  }
  render() {
    const { name } = this.props;
    return (
      <Container>
        <p>Waiting for {name} to kiss you back.</p>
        <Button onClick={this.cancel}>=>Nevermind</Button>
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
WaitKiss.propTypes = {
  dispatch: func.isRequired
};

export default connect(WaitKiss);
