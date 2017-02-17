import React from 'react';
import styled from 'styled-components';

import { DotArray } from './dot';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import cz from 'utils/styled-classes';

const Header = styled(cz('div', 'highlight'))`
  font: ${Fonts.h1};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background: ${Colors.sun};
  transition: background-color 1s;
  color: ${Colors.stone};
  padding: 0 .25em;
  box-shadow: ${Colors.shadow};
  &.highlight {
    background: ${Colors.sand};
  }
`

class StatHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    }
  }
  getChange(who) {
    const { value } = this.props;
    let change = 0;
    if (who != null) {
      if (who > value) {
        change = 1;
      }
      else {
        change = -1;
      }
    }
    return change;
  }
  hover(value) {
    return () => {
      this.setState({hover: value})
    }
  }
  render() {
    const { name, value, length, disabled, increment, decrement } = this.props;
    const { hover } = this.state;
    const checkedProps = {
      onClick: decrement
    }
    const uncheckedProps = {
      onClick: increment
    }
    const highlight = this.getChange(hover);
    return (
      <Header highlight={value == length}>
        {name.toUpperCase()}
        <DotArray value={value}
                  length={length}
                  disabled={disabled}
                  checkedProps={checkedProps}
                  uncheckedProps={uncheckedProps}/>
      </Header>
    );
  }
}

StatHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

StatHeader.defaultProps = {
  disabled: false
}

export default StatHeader;
