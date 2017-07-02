import React from 'react';
import rx from 'resplendence';

rx`
@import "~common/colors";
@import "~common/fonts";
`

const Container = rx('li')`
  white-space: nowrap;
`
const Icon = rx('span')`
  position: relative;
  top: .1em;
  border-radius: 1em;
  width: 1em;
  height: 1em;
  display: inline-block;
  text-align: center;
  padding: .25em .25em .25em .25em;
  margin-right: .25em;
  font: $icon;
  &.me {
    background: $details-color;
    color: $details-background;
  }
`
const Name = 'span';

class Player extends React.PureComponent {
  render() {
    const { name, me, admin } = this.props;
    const icon = admin ? '*' : 'u';
    return (
      <Container>
        <Icon rx={{me}}>{icon}</Icon>
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
