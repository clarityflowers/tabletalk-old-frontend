import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

const Container = styled.div`

`
const P = styled.p`
  margin: .4em 0 .4em 0;
`

let Talk = (props) => {
  return (
    <Container className={cx(props.className, 'talk')}>
      <P>
        {props.message}
      </P>
    </Container>
  )
}

Talk.propTypes = {
  message: React.PropTypes.string.isRequired,
}

export default Talk;
