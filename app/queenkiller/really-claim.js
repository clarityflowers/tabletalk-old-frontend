import React from 'react';
import styled from 'styled-components';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = styled.div`
`
const Button = styled(CommonButton)`
  color: white;
  display: block;
`
const Innocent = 'p';
const Murderous = styled.p`
  color: red;
`

class ReallyClaim extends React.PureComponent {
  constructor(props) {
    super(props);
    this.claim = this.claim.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  claim() {
    const { dispatch } = this.props;
    dispatch('claim');
  }
  cancel() {
    const { dispatch } = this.props;
    dispatch('navigate', 'play');
  }
  render() {
    return (
      <Container>
        <p>
          The crown thrums with power. Are you sure you want to do this?
        </p>
        <p>
          <Button onClick={this.claim}>=>Yes, I am</Button>
          <Button onClick={this.cancel}>=>Nevermind</Button>
        </p>
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
ReallyClaim.propTypes = {
  dispatch: func.isRequired
};

export default connect(ReallyClaim);
