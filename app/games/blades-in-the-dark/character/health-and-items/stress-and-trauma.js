'use strict'

import React from 'react';
import cx from 'classnames';

import Tickbars from './tickbars';

import './stress-and-trauma.scss';

const TraumaList = (props) => {
  const { trauma, off, onTraumaClick } = props;
  let traumaList = [
    'Cold', 'Haunted', 'Obsessed',
    'Paranoid', 'Reckless', 'Soft',
    'Unstable', 'Vicious'
  ]
  let traumas = [];
  for (let i=0; i < traumaList.length; i++) {
    let show = true;
    for (let j=0; j < trauma.length; j++ ) {
      if (traumaList[i].toUpperCase() == trauma[j].toUpperCase()) {
        show = false;
      }
    }
    if (show) {
      traumas.push(
        <button key={i} className='trauma' disabled={off} onClick={onTraumaClick}>
          {traumaList[i].toUpperCase()}
        </button>
      );
    }
  }
  let className = cx('trauma-list', {off})
  return (
    <div className={className}>
      {traumas}
    </div>
  );
}

TraumaList.propTypes = {
  trauma: React.PropTypes.array.isRequired,
  onTraumaClick: React.PropTypes.func.isRequired,
  off: React.PropTypes.bool.isRequired
}

TraumaList.defaultProps = {
  off: false
}

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
        <TraumaList trauma={this.props.trauma}
                    off={!this.state.showTraumaSelector}
                    onTraumaClick={this.handleToggleTraumaSelector.bind(this)}/>
      </div>
    );
  }
}

StressAndTrauma.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired
}

export default StressAndTrauma;
