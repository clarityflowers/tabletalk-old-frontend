'use strict'

import React from 'react';
import styled from 'styled-components';

import Portal from 'blades/window/common/portal';
import Title from 'blades/common/components/title';

class NewAbility extends React.PureComponent {
  render() {
    const {
      off
    } = this.props;
    return (
      <Portal right={off}>
        <Title name="New Ability"/>
      </Portal>
    )
  }
}

const { bool } = React.PropTypes;
NewAbility.propTypes = {
  off: bool.isRequired
}

export default NewAbility;
