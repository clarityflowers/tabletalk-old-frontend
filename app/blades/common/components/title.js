'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  font: $h1;
  font-size: 2em;
  color: $sun;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 1em;
`
const Span = rx('div')`
  white-space: nowrap;
  margin: 0 0.25em;
`
const Name = Span;
const Playbook = rx(Span)`
  color: $sand;
`
const Alias = rx(Span)`
  color: $fire;
`
const Crew = rx(Span)`
  color: $sky;
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
