import React from 'react';
import rx from 'resplendence';

import { DotArray } from 'blades/window/common/dot';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Header = rx('div')`
  font: $h1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background: $sun;
  transition: background-color 1s;
  color: $stone;
  padding: 0 .25em;
  box-shadow: $shadow;
  &.highlight {
    background: $sand;
  }
`

class XP extends React.PureComponent {
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
      <Header rx={{highlight: value == length }}>
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

XP.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

XP.defaultProps = {
  disabled: false
}

export default XP;
