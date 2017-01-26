import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
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
