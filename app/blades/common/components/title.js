'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts'

const { h1 } = Fonts;
const { sun, sand, fire, sky } = Colors;

const Container = styled.div`
  font: ${h1};
  font-size: 2em;
  color: ${sun};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 1em;
`
const Span = styled.div`
  white-space: nowrap;
  margin: 0 0.25em;
`
const Name = Span;
const Playbook = styled(Span)`
  color: ${sand};
`
const Alias = styled(Span)`
  color: ${fire};
`
const Crew = styled(Span)`
  color: ${sky};
`

class Title extends React.PureComponent {
  render() {
    const { name, playbook, alias, crew } = this.props;
    let aliasDiv = null;
    let playbookDiv = null;
    if (alias) {
      aliasDiv = (
        <Alias>
          "{alias}"
        </Alias>
      );
    }
    if (playbook ) {
      if (crew) {
        playbookDiv = (
          <Crew>{playbook}</Crew>
        )
      }
      else {
        playbookDiv = (
          <Playbook>the {playbook}</Playbook>
        )
      }
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

const { string, bool } = React.PropTypes;
Title.propTypes = {
  name: string.isRequired,
  playbook: string,
  alias: string,
  crew: bool
}

export default Title;
