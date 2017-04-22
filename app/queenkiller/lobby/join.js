import React from 'react';
import styled from 'styled-components';

import CommonButton from 'common/button';

import cz from 'utils/styled-classes';
import connect from 'utils/connect';

const Button = styled(cz(CommonButton, 'ready'))`
  color: white;
  &.ready {
    color: red;
  }
`

class Join extends React.PureComponent {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
  }
  join() {
    const { dispatch } = this.props;
    dispatch('join');
  }
  leave() {
    const { dispatch } = this.props;
    dispatch('leave');
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <Button onClick={this.leave} ready>=> Cancel</Button>
      )
    }
    else {
      return (
        <Button onClick={this.join}>=> I am ready</Button>
      )
    }
  }
}

const { bool, func } = React.PropTypes;
Join.propTypes = {
  ready: bool.isRequired,
  dispatch: func.isRequired
};

export default connect(Join);
