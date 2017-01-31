'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts'

const Container = styled.div`
  font: ${Fonts.h1};
  font-size: 2em;
  color: $sun;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 1em;
`
const Span = styled.div`
  white-space: nowrap;
  margin: 0.25em;
`
const Name = styled(Span)`
  color: ${Colors.sun};
`
const Playbook = styled(Span)`
  color: ${Colors.sand};
`
const Alias = styled(Span)`
  Color: ${Colors.fire};
`

class Title extends React.PureComponent {
  render() {
    console.log('render title');
    const { name, playbook, alias } = this.props;
    let aliasDiv = null;
    let playbookDiv = null;
    if (alias) {
      aliasDiv = (
        <Alias>
          "{alias}"
        </Alias>
      );
    }
    if (playbook) {
      playbookDiv = (
        <Playbook>
          the {playbook}
        </Playbook>
      );
    }
    return (
      <Container>
        <Name>
          {name}
        </Name>
        {playbookDiv}
        {aliasDiv}
      </Container>
    );
  }
}

Title.propTypes = {
  name: React.PropTypes.string.isRequired,
  playbook: React.PropTypes.string,
  alias: React.PropTypes.string,
}

export default Title;
