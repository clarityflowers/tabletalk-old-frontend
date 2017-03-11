'use strict'

import React from 'react';
import styled from 'styled-components';

import Cohort from './cohort';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: .5em;
`

class Cohorts extends React.PureComponent {
  render() {
    const { cohorts, disabled } = this.props;
    const cohortDOMs = [];
    for (let i=0; i < cohorts.length; i++) {
      const cohort = cohorts[i];
      cohortDOMs.push(
        <Cohort key={cohort.id} {...cohort} disabled={disabled}/>
      )
    }
    return (
      <Container>
        {cohortDOMs}
      </Container>
    )
  }
}

const { array, bool } = React.PropTypes;
Cohorts.propTypes = {
  cohorts: array.isRequired,
  disabled: bool.isRequired
}

export default Cohorts;
