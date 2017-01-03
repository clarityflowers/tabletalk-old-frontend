import React from 'react';

class Link extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.route.go();
  }
  render() {
    let props = Object.assign({}, this.props);
    delete props.route;
    return (
      <a {...props} onClick={this.handleClick.bind(this)}>{this.props.children}</a>
    );
  }
}

Link.propTypes = {
  route: React.PropTypes.object.isRequired
}

export default Link;
