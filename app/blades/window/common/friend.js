'use strict'

import React from 'react';
import rx from 'resplendence';

import Icon from './friend-icon';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  max-width: 40em;
  width: 100%;
  margin-bottom: 1em;
`
const Header = rx('div')`
  font: $h1;
  font-size: 1.25em;
  display: flex;
  flex-flow: row wrap;
  margin-left: -2em;
  white-space: nowrap;
`
const Name = rx('div')`
  margin-right: .75em;
  color: lighten($sky, 15%);
`
const Title = rx('div')`
  white-space: nowrap;
  color: $sky;
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
