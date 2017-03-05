import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import cz from 'utils/styled-classes';

const A = styled(cz('a', 'disabled'))`
  &:not(.disabled) {
    cursor: pointer;
    &:focus {
      outline: none;
      text-decoration: underline;
    }
  }
`

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.go = this.go.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  go() {
    this.props.route.go();
  }
  handleKeyDown(e) {
    if (e.which == '32' || e.which == '13') {
      e.preventDefault()
      this.go();
      return false;
    }
  }
  render() {
    const { route, className, disabled, children, ...rest } = this.props;
    const name = cx(className, {disabled});
    return (
      <A {...rest} className={name} tabIndex={disabled ? null : "0"}
         onClick={this.go} onKeyDown={this.handleKeyDown}>
        {children}
      </A>
    );
  }
}

Link.propTypes = {
  route: React.PropTypes.object.isRequired
}

export default Link;
