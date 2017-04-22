import React from 'react';
import styled from 'styled-components';
import CommonButton from 'common/button';

import connect from 'utils/connect';

const Container = styled.div`
  color: white;
`
const List = styled.ul`
  margin: 0 1.5em;
  padding: 0;
`
const Item = styled.li`
  padding: 0;
`
const Button = styled(CommonButton)`
  color: white;
`

class Intro extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ready = this.ready.bind(this);
  }
  ready() {
    const { dispatch } = this.props;
    dispatch('ready');
  }
  render() {
    const { ready } = this.props;
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
        <p>
          The queen is dead. One of us killed her.<br/>
          Her crown is unclaimed. One of us is worthy.
        </p>
        <p>
          The object is to make a mess: fight our friends, fall in love with our
          enemies.
        </p>
        <p>
          We each also have a secret object. Choose:
        </p>
        <List>
          <Item>become ruler</Item>
          <Item>survive</Item>
          <Item>earn ___'s love</Item>
          <Item>avenge ___</Item>
          <Item>support ___</Item>
          <Item>see ___ slain</Item>
        </List>
        <p>
          Change this anytime.
        </p>
        {button}
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
Intro.propTypes = {
  ready: bool.isRequired,
  dispatch: func.isRequired
};

export default connect(Intro);
