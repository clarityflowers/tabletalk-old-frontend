import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  color: fade-out($stone, 0.6);
  font: $h2;
  line-height: 1.1;
  margin: .2em 0;
`

let Log = (props) => {
  const { name, message } = props;
  const text = message.replace("{player}", name);
  return (
    <Container>
      {text}
    </Container>
  ) ;
}

export default Log;
