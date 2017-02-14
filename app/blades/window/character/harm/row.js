'use strict'

import React from 'react';
import styled from 'styled-components';

import Value from './value';
import CommonRow from 'common/row';

import Colors from './colors';
import cz from 'utils/styled-classes';
import connect from 'utils/connect';

const { dark, darkText, highlight, highlightText } = Colors;

const Container = styled(CommonRow)`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  &.highlight {
    div.level, div.penalty {
      background: ${highlight};
      color: ${highlightText};
    }
  }
`
const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
`
const Label = styled(cz(Box, 'highlight'))`
  flex: 0 0 auto;
  background: ${dark};
  color: ${darkText};
  transition-property: background-color, color;
  transition-duration: 1s;
  &.highlight {
    background: ${highlight};
    color: ${highlightText};
  }
`
const Penalty = styled(Label)`
  width: 4em;
  font-size: .6em;
`
const Level = styled(Label)`
  width: 2em;
`
const Values = styled(Box)`
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
`

const NAMES = ['LESSER', 'MODERATE', 'SEVERE']

class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.update1 = this.update1.bind(this);
    this.update2 = this.update2.bind(this);
  }
  update(harm, value) {
    const { dispatch } = this.props;
    dispatch('edit_harm', {harm: harm, text: value});
  }
  update1(value) {
    const { level } = this.props;
    let name = NAMES[level - 1].toLowerCase();
    if (level < 3) {
      name += '1';
    }
    this.update(name, value);
  }
  update2(value) {
    const { level } = this.props;
    let name = NAMES[level - 1].toLowerCase() + '2';
    this.update(name, value);
  }
  render() {
    const {
      harm1, harm2, level, penalty, disabled
    } = this.props;
    let values = [];
    values.push(
      <Value key={1} name={NAMES[level - 1]} update={this.update1}
             value={harm1} disabled={disabled}/>
    )
    if (harm2 != undefined) {
      values.push(
        <Value key={2} name={NAMES[level - 1]} update={this.update2}
              value={harm2} disabled={disabled}/>
      )
    }
    const highlight = harm1 || harm2
    return (
      <Container>
        <Level highlight={highlight}>{level}</Level>
        <Values>{values}</Values>
        <Penalty highlight={highlight}>{penalty.toUpperCase()}</Penalty>
      </Container>
    );
  }
}

Row.propTypes = {
  harm1: React.PropTypes.string.isRequired,
  harm2: React.PropTypes.string,
  level: React.PropTypes.number.isRequired,
  penalty: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
}

export default connect(Row);
