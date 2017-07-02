import React from 'react';
import rx from 'resplendence';

const Input = rx('input')`
  &:focus {
    outline: none;
  }
`

const Submit = (props) => {
  return (
    <Input type='submit' {...props}/>
  );
}

export default Submit;
