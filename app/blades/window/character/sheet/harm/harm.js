'use strict'

import React from 'react';
import styled from 'styled-components';

import Row from './row';

import Colors from 'blades/common/colors';

const { stone, sun, shadow } = Colors;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-align: stretch;
  flex: 0 0 auto;
  width: 100%;
`
const Header = styled.div`
  color: ${stone};
  background: ${sun};
  padding: 0 .2em;
  box-shadow: ${shadow};
  z-index: 10;
`
const Body = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-align: stretch;
  box-shadow: ${shadow};
  z-index: 9;
`

const Harm = (props) => {
  const {
    lesser1, lesser2, moderate1, moderate2, severe,
    edit, disabled
  } = props;
  return (
    <Container>
      <Header>HARM</Header>
      <Body>
        <Row harm1={severe} level={3} penalty='need help'
                 disabled={disabled}/>
        <Row harm1={moderate1} harm2={moderate2} level={2} penalty='-1d'
                 disabled={disabled}/>
        <Row harm1={lesser1} harm2={lesser2} level={1} penalty='less effect'
                 disabled={disabled}/>
      </Body>
    </Container>
  );
}

Harm.propTypes = {
  lesser1: React.PropTypes.string.isRequired,
  lesser2: React.PropTypes.string.isRequired,
  moderate1: React.PropTypes.string.isRequired,
  moderate2: React.PropTypes.string.isRequired,
  severe: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default Harm;
