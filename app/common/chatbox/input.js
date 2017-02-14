import React from 'react';
import styled from 'styled-components';
import AutosizeTextarea from 'react-textarea-autosize';

const Textarea = styled(AutosizeTextarea)`
  flex: none;
  width: 100%;
  height: auto;
  border: none;
  resize: none;
  padding: 1em;
  min-height: 1em;
  box-sizing: border-box;
  background-color: white;
  &:focus {
    outline: none;
  }
`

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  handleKeyDown(e) {
    if (e.key == 'Enter' && !e.shiftKey) {
      this.props.onChat(this.state.value);
      this.setState({value: ""});
      e.preventDefault();
    }
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    const { className } = this.props;
    return (
      <Textarea className={className}
                placeholder='Say something'
                onKeyDown={this.handleKeyDown.bind(this)}
                onChange={this.handleChange.bind(this)}
                value={this.state.value}/>
    );
  }
}

export default Input;
