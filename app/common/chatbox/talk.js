import React from 'react';
import rx from 'resplendence';

const Container = 'div';
const P = rx('p')`
  margin: .4em 0 .4em 0;
`

let Talk = (props) => {
  return (
    <Container rx={[props.className, 'talk']}>
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
