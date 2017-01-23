'use strict'

import React from 'react';
import cx from 'classnames';
import TextArea from 'react-textarea-autosize';

import './harm.scss';

class HarmValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.toUpperCase(),
      focused: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({value: nextProps.value.toUpperCase()});
    }
  }
  handleChange(e) {
    const result = e.target.value.toUpperCase().substring(0, 30);
    if (!result && this.props.value) {
      this.props.edit("");
    }
    this.setState({value: result});
  }
  handleBlur(e) {
    const result = e.target.value.toUpperCase().trim().substring(0, 30);
    if (result != this.props.value) {
      this.props.edit(result);
    }
    this.setState({
      value: result,
      focused: false
    });
  }
  handleFocus(e) {
    this.setState({focused: true});
    document.getElementById(this.props.id).select();
  }
  render() {
    const { id, name, disabled } = this.props;
    const { value, focused } = this.state;
    const className = cx('value', {
      highlight: !!value
    })
    const text = (value || focused) ? value : name
    return (
      <div className='value'>
        <TextArea id={id}
                  className={className} value={text}
                  onChange={this.handleChange.bind(this)}
                  onBlur={this.handleBlur.bind(this)}
                  onFocus={this.handleFocus.bind(this)}
                  ref='box'
                  disabled={disabled}/>
      </div>
    )
  }
}

HarmValue.propTypes = {
  value: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  edit: React.PropTypes.func.isRequired,
  id: React.PropTypes.any.isRequired,
  name: React.PropTypes.string.isRequired
}

const NAMES = ['LESSER', 'MODERATE', 'SEVERE']

const HarmRow = (props) => {
  const {
    harm1, harm2, level, penalty, disabled,
    edit1, edit2
  } = props;
  const className = cx('row', {
    highlight: harm1 || harm2
  });
  let values = [];
  values.push(
    <HarmValue key={1} id={`harm-value-${level}-1`} name={NAMES[level - 1]}
               value={harm1} edit={edit1} disabled={disabled}/>
  )
  if (harm2 != undefined) {
    values.push(
      <HarmValue key={2} id={`harm-value-${level}-2`} name={NAMES[level - 1]}
                 value={harm2} edit={edit2} disabled={disabled}/>
    )
  }
  return (
    <div className={className}>
      <div className='level'>{level}</div>
      <div className='values'>{values}</div>
      <div className='penalty'>{penalty.toUpperCase()}</div>
    </div>
  );
}

HarmRow.propTypes = {
  harm1: React.PropTypes.string.isRequired,
  harm2: React.PropTypes.string,
  level: React.PropTypes.number.isRequired,
  penalty: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  edit1: React.PropTypes.func.isRequired,
  edit2: React.PropTypes.func
}

const Harm = (props) => {
  const {
    lesser1, lesser2, moderate1, moderate2, severe,
    edit, disabled
  } = props;
  const editLesser1 = (value) => { edit({harm: 'lesser1', text: value}); }
  const editLesser2 = (value) => { edit({harm: 'lesser2', text: value}); }
  const editModerate1 = (value) => { edit({harm: 'moderate1', text: value}); }
  const editModerate2 = (value) => { edit({harm: 'moderate2', text: value}); }
  const editSevere = (value) => { edit({harm: 'severe', text: value}); }
  return (
    <div className='harm'>
      <div className='header'>HARM</div>
      <div className='body'>
        <HarmRow harm1={severe} level={3} penalty='need help'
                 disabled={disabled}
                 edit1={editSevere.bind(this)}/>
        <HarmRow harm1={moderate1} harm2={moderate2} level={2} penalty='-1d'
                 disabled={disabled}
                 edit1={editModerate1.bind(this)}
                 edit2={editModerate2.bind(this)}/>
        <HarmRow harm1={lesser1} harm2={lesser2} level={1} penalty='less effect'
                 disabled={disabled}
                 edit1={editLesser1.bind(this)}
                 edit2={editLesser2.bind(this)}/>
      </div>
    </div>
  );
}

Harm.propTypes = {
  lesser1: React.PropTypes.string.isRequired,
  lesser2: React.PropTypes.string.isRequired,
  moderate1: React.PropTypes.string.isRequired,
  moderate2: React.PropTypes.string.isRequired,
  severe: React.PropTypes.string.isRequired,
  edit: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default Harm;
