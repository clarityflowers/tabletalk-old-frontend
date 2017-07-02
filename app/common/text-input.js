import React from 'react';
import rx from 'resplendence';

const Input = rx('input')`
  &:focus {
    outline: none;
  }
`

const TextInput = (props) => {
  return (
    <Input type='text' {...props}/>
  );
}

export default TextInput;
