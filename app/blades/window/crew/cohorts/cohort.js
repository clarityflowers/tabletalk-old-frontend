'use strict'

import React from 'react';
import styled from 'styled-components';

import CommonLabel from 'blades/window/styles/label-button';
import Stat from './stat';
import Tier from 'blades/window/common/tier';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { fadeout, darken } from 'utils/color-tools';
import connect from 'utils/connect';

const { sand, sun, stone, fire, sky, shadow, textShadow } = Colors;
const { h1, h2, body } = Fonts;

const Container = styled.div`
  user-select: none;
  cursor: default;
`
const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
`
const Header = styled(Row)`
  height: auto;
  align-items: stretch;
`
const Status = styled(Row)`
  overflow: hidden;
  justify-content: space-between;
  max-width: 15em;
  margin-right: 3em;
`;
const Label = styled((props) => (<CommonLabel disabled {...props}/>))`
  flex: 1 1 auto;
  min-width: 12.5em;
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  height: auto;
`
const Kind = styled.div`
color: ${fadeout(fire, .0)}
`
const Name = styled.div`
margin-right: .3em;
`
const Tags = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const TagGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  &:not(:last-child) {
    margin-right: .5em;
  }
`
const Tag = styled.div`
  font: ${h2};
  font-size: .75em;
  &:not(:last-child) {
    margin-right: .5em;
  }
  text-shadow: ${textShadow};
`
const Edge = styled(Tag)`
  color: ${sky};
`
const Flaw = styled(Tag)`
  color: ${fire};
`
const Description = styled.div`
  font: ${body};
  font-size: .75em;
  color: ${fadeout(sun, 0.2)};
`

class Cohort extends React.PureComponent {
  constructor(props) {
    super(props);
    this.set = this.set.bind(this);
    this.setWeak = this.setWeak.bind(this);
    this.setImpaired = this.setImpaired.bind(this);
    this.setBroken = this.setBroken.bind(this);
    this.setArmor = this.setArmor.bind(this);
  }
  set(field, value) {
    const { dispatch, id } = this.props;
    dispatch('cohort', {id, field, value});
  }
  setWeak(value) {
    this.set('weak', value);
  }
  setImpaired(value) {
    this.set('impaired', value);
  }
  setBroken(value) {
    this.set('broken', value)
  }
  setArmor(value) {
    this.set('armor', value);
  }
  render() {
    const {
      id, name, kind, isGang, quality,
      weak, impaired, broken, armor,
      edges, flaws,
      description,
      disabled
    } = this.props;
    let label = null;
    const edgeTags = [];
    const flawTags = [];

    if (name) {
      label = (
        <Label>
          <Name>{name}</Name>
          <Kind>{kind}</Kind>
        </Label>
      );
    }
    else {
      label = (
        <Label>
          <Name>{kind}</Name>
        </Label>
      );
    }

    for (let i=0; i < edges.length; i++) {
      edgeTags.push(<Edge key={i}>{edges[i]}</Edge>);
    }
    for (let i=0; i < flaws.length; i++) {
      flawTags.push(<Flaw key={i}>{flaws[i]}</Flaw>);
    }
    return (
      <Container>
        <Header>
          {label}
          <Tier value={quality} max={5}/>
        </Header>
        <Status>
          <Stat name="Weak" harm checked={weak}
                set={this.setWeak} disabled={disabled}/>
          <Stat name="Impaired" harm checked={impaired}
                set={this.setImpaired} disabled={disabled}/>
          <Stat name="Broken" harm checked={broken}
                set={this.setBroken} disabled={disabled}/>
          <Stat name="Armor" checked={armor}
                set={this.setArmor} disabled={disabled}/>
        </Status>
        <Tags>
          <TagGroup>{edgeTags}</TagGroup>
          <TagGroup>{flawTags}</TagGroup>
        </Tags>
        <Description>{description}</Description>
      </Container>
    )
  }
}

const { string, number, bool, array, func } = React.PropTypes;
Cohort.propTypes = {
  id: number.isRequired,
  name: string,
  kind: string.isRequired,
  isGang: bool.isRequired,
  quality: number.isRequired,
  weak: bool.isRequired,
  impaired: bool.isRequired,
  broken: bool.isRequired,
  armor: bool.isRequired,
  edges: array.isRequired,
  flaws: array.isRequired,
  description: string,
  disabled: bool.isRequired,
  dispatch: func.isRequired,
}

export default connect(Cohort);
