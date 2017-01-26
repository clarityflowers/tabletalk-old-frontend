import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
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
