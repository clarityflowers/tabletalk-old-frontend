import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { fadeout } from 'utils/color-tools';
const { stone } = Colors;

const color = fadeout(stone, .6);
const Container = styled.div`
  color: ${color};
  font: ${Fonts.h2};
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
