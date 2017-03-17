'use strict'

import React from 'react';
import styled, { css } from 'styled-components';

import TextArea from 'react-textarea-autosize';

import Colors from './colors';
import Fonts from 'blades/common/fonts';
import { lighten, darken } from 'utils/color-tools';
import cz from 'utils/styled-classes';
import props from 'utils/props';

const { dark, darkText, highlight, highlightText } = Colors;
const background = darken(dark, 0.5);
const color = darken(darkText, 0.25);
const focusHighlight = lighten(highlight, 0.1);

const Container = styled.div`
  flex: 1 1 auto;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  width: 10em;
`
const highlighted = css`
`
const Text = styled(cz(TextArea, 'highlight'))`
  flex: 1 1 auto;
  align-self: stretch;
  font: ${Fonts.h1};
  background: ${background};
  color: ${color};
  transition-property: background-color, color;
  transition-duration: 1s;
  border: none;
  margin: 0;
  resize: none;
  width: 100%;
  min-height: 2.5em;
  text-align: center;
  padding: .6em;
  box-sizing: border-box;
  margin: none;
  &:disabled {
    cursor: default;
  }
  &:not(:disabled) {
    &:focus {
      outline: none;
    }
  }
  &::selection {
    background: ${highlight};
  }
  &.highlight {
    background: ${highlight};
    color: ${highlightText};
    &:not(:disabled) {
      &:focus {
        background: ${focusHighlight};
      }
    }
  }
`

class Value extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.toUpperCase(),
      focused: false
    }
    this.box = null;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({value: nextProps.value.toUpperCase()});
    }
  }
  handleChange(e) {
    const { update, value } = this.props;
    const result = e.target.value.toUpperCase().substring(0, 30);
    if (!result && value) {
      update("");
    }
    this.setState({value: result});
  }
  handleBlur(e) {
    const { update, value } = this.props;
    const result = e.target.value.toUpperCase().trim().substring(0, 30);
    if (result != value) {
      update(result);
    }
    this.setState({
      value: result,
      focused: false
    });
  }
  handleFocus(e) {
    this.setState({focused: true});
    if (this.box) {
      const root = this.box._rootDOMNode;
      if (root) {
        root.select();
      }
    }
  }
  render() {
    const { id, name, disabled } = this.props;
    const { value, focused } = this.state;
    const text = (value || focused) ? value : name
    return (
      <Container>
        <Text highlight={!!value}
              value={text}
              onChange={this.handleChange.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              innerRef={e => {if (e) {this.box = e}}}
              disabled={disabled}/>
      </Container>
    )
  }
}

const { string, bool, any, func } = React.PropTypes;
Value.propTypes = {
  value: string.isRequired,
  disabled: bool.isRequired,
  name: string.isRequired,
  update: func.isRequired
}

export default Value;
