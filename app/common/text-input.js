import React from 'react';
import rx from 'resplendence';

const Input = rx('input')`
  &:focus {
    outline: none;
  }
`

const TextInput = ({innerRef, ...rest}) => {
  return (
    <Input type='text' innerRef={innerRef} {...rest}/>
  );
}

export default TextInput;
