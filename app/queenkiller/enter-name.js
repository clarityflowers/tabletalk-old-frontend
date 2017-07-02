import React from 'react';
import rx from 'resplendence'
import CommonButton from 'common/button';;

import TextInput from 'common/text-input';
import connect from 'utils/connect';

const Container = 'div'
const Input = rx(TextInput)`--1
  font-size: 1em;
`
const Button = rx(CommonButton)`--1
  color: white;
`

class EnterName extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleKeyDown(e) {
    console.log(e);
  }
  submit() {
    const { dispatch } = this.props;
    const { value } = this.state;
    dispatch('enter_name', value);
  }
  render() {
    const { name } = this.props;
    const { value } = this.state;
    var button = null;
    var input = (
      <p>{name}</p>
    );
    if (!name) {
      input = (
        <Input value={value} onChange={this.handleChange}/>
      )
      button = (
        <Button onClick={this.submit} onKeyDown={this.handleKeyDown}>=>Continue</Button>
      );
    }
    return (
      <Container>
        <p>Name yourself</p>
        {input}
        {button}
      </Container>
    )
  }
}

const { string } = React.PropTypes;
EnterName.propTypes = {

};

export default connect(EnterName);
