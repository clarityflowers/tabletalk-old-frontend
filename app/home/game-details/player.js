import React from 'react';
import styled from 'styled-components';

import Colors from 'common/colors';
import Fonts from 'common/fonts';

import cz from 'utils/styled-classes';

const { color, background } = Colors.details;

const Container = styled.li`
  white-space: nowrap;
`
const Icon = styled(cz('span','me'))`
  position: relative;
  top: .1em;
  border-radius: 1em;
  width: 1em;
  height: 1em;
  display: inline-block;
  text-align: center;
  padding: .25em .25em .25em .25em;
  margin-right: .25em;
  font: ${Fonts.icon};
  &.me {
    background: ${color};
    color: ${background};
  }
`
const Name = 'span';

class Player extends React.PureComponent {
  render() {
    const { name, me, admin } = this.props;
    const icon = admin ? '*' : 'u';
    return (
      <Container>
        <Icon me={me}>{icon}</Icon>
        <Name>
          {name}
        </Name>
      </Container>
    )
  }
}

const { string, bool } = React.PropTypes;
Player.propTypes = {
  name: string.isRequired,
  me: bool.isRequired,
  admin: bool.isRequired
}

export default Player;
