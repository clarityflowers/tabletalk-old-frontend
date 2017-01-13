'use strict'

import React from 'react';
import cx from 'classnames';

import { TickArray } from './tick.js';

import './tickbars.scss';

class Stress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    }
  }
  handleHover(value) {
    this.setState({hover: value});
  }
  getChange(value) {
    const { stress } = this.props;
    let result = 0;
    if (value != null) {
      if (value > stress && stress < 9) {
        result = 1;
      }
      else if (stress > 0){
        result = -1;
      }
    }
    return result;
  }
  handleClick(value) {
    const change = this.getChange(value);
    if (change) {
      this.props.update(this.props.stress + change);
    }
  }
  render() {
    const { disabled, stress } = this.props;
    const highlight = this.getChange(this.state.hover);
    const className = cx('label', {
      highlight: highlight > 0
    })
    return (
      <div className='stress bar'>
        <button className={className}
                onClick={() => {this.handleClick(9);}}
                onMouseOver={() => {this.handleHover(9);}}
                onMouseLeave={() => {this.handleHover(0);}}
                disabled={disabled || stress == 9}>
          STRESS
        </button>
        <TickArray value={stress} className='ticks' length={9}
                   disabled={disabled} onClick={this.handleClick.bind(this)}
                   onHover={this.handleHover.bind(this)} highlight={highlight}/>
      </div>
    );
  }
}

Stress.propTypes = {
  stress: React.PropTypes.number.isRequired,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

const Trauma = (props) => {
  const { count } = props;
  return (
    <div className='trauma bar'>
      <div className='label'>
        TRAUMA
      </div>
      <TickArray value={count} className='ticks' length={4} disabled={true}/>
    </div>
  );
}

Trauma.propTypes = {
  count: React.PropTypes.number.isRequired
}

const TraumaList = (props) => {
  const { trauma } = props;
  let traumas = [];
  for (let i=0; i<trauma.length; i++) {
    traumas.push(
      <div key={i} className='trauma'>
        {trauma[i].toUpperCase()}
      </div>
    )
  }
  return (
    <div className='trauma-list bar'>
      {traumas}
    </div>
  );
}

TraumaList.propTypes = {
  trauma: React.PropTypes.array.isRequired
}

const Tickbars = (props) => {
  const { trauma, stress, disabled, update } = props;
  return(
    <div className='tickbars'>
      <Stress stress={stress} update={update} disabled={disabled}/>
      <Trauma count={trauma.length}/>
      <TraumaList trauma={trauma}/>
    </div>
  );
}

Tickbars.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

export default Tickbars;
