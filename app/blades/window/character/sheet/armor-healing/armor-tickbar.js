'use strict'

import React from 'react';
import rx from 'resplendence';

import Tickbar from './tickbar';

import connect from 'utils/connect';

const Bar = rx(Tickbar)`--1
  flex: 1 1 auto;
  position: relative;
  z-index: 2;
  margin-bottom: 0.5em;
  &.top {
    z-index: 3;
  }
`

class ArmorTickbar extends React.Component {
  constructor(props) {
    super(props);
    this.use = this.use.bind(this);
  }
  use(value) {
    const { dispatch, name } = this.props;
    dispatch('use_armor', {name: name, used: value})
  }
  render() {
    const { used, available, name, ...rest } = this.props;
    rest.disabled = rest.disabled || !available;
    rest.checked = used;
    return (
      <Bar use={this.use} top={name == 'armor'} children={name} off={!available} {...rest}>
        {name.toUpperCase()}
      </Bar>
    );
  }
}

const { bool, func } = React.PropTypes;
ArmorTickbar.propTypes = {
  used: bool.isRequired,
  available: bool,
  dispatch: func.isRequired
}

ArmorTickbar.defaultProps = {
  available: true
}

export default connect(ArmorTickbar)
