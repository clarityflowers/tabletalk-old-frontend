import React from 'react';
import cx from 'classnames';

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
      <a {...rest} className={name} tabIndex={disabled ? null : "0"}
         onClick={this.go} onKeyDown={this.handleKeyDown}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  route: React.PropTypes.object.isRequired
}

export default Link;
