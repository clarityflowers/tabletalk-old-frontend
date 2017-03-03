'use strict'

import React from 'react';
import styled from 'styled-components';

import Friend from './friend';

const Container = styled.div`
  flex: 1 1 auto;
`

class Friends extends React.PureComponent {
  render() {
    const { strangeFriends, contacts } = this.props;
    let friends = [];
    for (let i=0; i < strangeFriends.length; i++) {
      const friend = strangeFriends[i];
      friends.push(
        <Friend key={i} contact={contacts} {...friend}/>
      )
    }
    return (
      <Container>
        {friends}
      </Container>
    )
  }
};

const { array, bool } = React.PropTypes;
Friends.propTypes = {
  strangeFriends: array.isRequired,
  contacts: bool
}

export default Friends;
