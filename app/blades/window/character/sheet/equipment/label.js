'use strict'

import React from 'react';
import rx from 'resplendence';

import inlined from 'utils/inlined';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = inlined(rx('div')`
  font: $h1;
  font-size: .75em;
  padding-right: 0.2em;
  padding-left: 0;
  color: $stone;
  background: $sun;
  position: absolute;
  box-shadow: $shadow;
  transition: opacity .3s;
  width: 0em;
  left: .75em;
  top: .1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  transition: width .25s ease-in-out,
              padding .25s ease-in-out,
              background 1s;
  overflow: hidden;
  &.on {
    padding-left: 1.3em;
  }
  &.over {
    color: $sun;
    background: $fire;
  }
`, width => {
  return {width: `${width}px`};
});

const Content = 'div'

class Label extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
    this.updateWidth = this.updateWidth.bind(this);
  }
  updateWidth(e) {
    if (e) {
      this.setState({width: e.scrollWidth});
    }
  }
  render() {
    const { name, on, over } = this.props;
    const { width } = this.state;
    return (
      <Container className='label' style={on ? width : 0} rx={{on, over}}>
        <Content ref={this.updateWidth}>
          {name.toUpperCase()}
        </Content>
      </Container>
    );
  }
}

const { string, bool } = React.PropTypes;
Label.propTypes = {
  name: string.isRequired,
  on: bool.isRequired,
  over: bool.isRequired
}

export default Label;
