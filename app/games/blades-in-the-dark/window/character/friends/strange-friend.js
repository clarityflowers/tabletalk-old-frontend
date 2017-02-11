'use strict'

import React from 'react';
import styled from 'styled-components';

import Icon from './icon';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { lighten } from 'utils/color-tools';

const { sky } = Colors;

const Container = styled.div`
  max-width: 40em;
  width: 100%;
  margin-bottom: 1em;
`
const Header = styled.div`
  font: ${Fonts.h1};
  font-size: 1.25em;
  display: flex;
  flex-flow: row wrap;
  margin-left: -2em;
  white-space: nowrap;
`
const Name = styled.div`
  margin-right: .75em;
  color: ${lighten(sky, 0.15)};
`
const Title = styled.div`
  white-space: nowrap;
  color: ${sky};
`
const Description = 'div';

class StrangeFriend extends React.PureComponent {
  render() {
    const { name, title, description, isFriend } = this.props;
    return (
      <Container>
        <Header>
          <Icon isFriend={isFriend}/>
          <Name>{name}</Name>
          <Title>{title}</Title>
        </Header>
        <Description>{description}</Description>
      </Container>
    )
  }
}

const { string, bool } = React.PropTypes;
StrangeFriend.propTypes = {
  name: string.isRequired,
  title: string.isRequired,
  description: string,
  isFriend: bool
}

export default StrangeFriend;
