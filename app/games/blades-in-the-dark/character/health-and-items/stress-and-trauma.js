'use strict'

import React from 'react';
import cx from 'classnames';

import Tickbars from './tickbars';

import './stress-and-trauma.scss';

class StressAndTrauma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTraumaSelector: false
    }
  }
  handleToggleTraumaSelector() {
    this.setState({showTraumaSelector: !this.state.showTraumaSelector});
  }
  render() {
    return(
      <div className='stress-and-trauma'>
        <Tickbars stress={this.props.stress}
                  trauma={this.props.trauma}
                  onButtonClick={this.handleToggleTraumaSelector.bind(this)}/>
      </div>
    );
  }
}

StressAndTrauma.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired
}

export default StressAndTrauma;
