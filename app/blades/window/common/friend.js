'use strict'

import React from 'react';
import styled from 'styled-components';

import Icon from './friend-icon';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
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

class Friend extends React.PureComponent {
  render() {
    const { name, title, description, isFriend, contact, favorite } = this.props;
    return (
      <Container>
        <Header>
          <Icon isFriend={isFriend} isFavorite={favorite}/>
          <Name>{name}</Name>
          <Title>{title}</Title>
        </Header>
        <Description>{description}</Description>
      </Container>
    )
  }
}

const { string, bool } = React.PropTypes;
Friend.propTypes = {
  name: string.isRequired,
  title: string.isRequired,
  description: string,
  isFriend: bool,
  favorite: bool
}

export default Friend;
