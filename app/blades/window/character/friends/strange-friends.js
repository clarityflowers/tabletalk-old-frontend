'use strict'

import React from 'react';
import styled from 'styled-components';

import StrangeFriend from './strange-friend';

const Container = styled.div`
  flex: 1 1 auto;
`

class StrangeFriends extends React.PureComponent {
  render() {
    const { strangeFriends } = this.props;
    let friends = [];
    for (let i=0; i < strangeFriends.length; i++) {
      const friend = strangeFriends[i];
      friends.push(
        <StrangeFriend key={i} {...friend}/>
      )
    }
    return (
      <Container>
        {friends}
      </Container>
    )
  }
};

const { array } = React.PropTypes;
StrangeFriends.propTypes = {
  strangeFriends: array.isRequired
}

export default StrangeFriends;
