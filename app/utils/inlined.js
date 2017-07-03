import React from 'react';

const inlined = (Element, transform) => {
  return ({style, ...props}) => {
    return <Element style={transform(style)} {...props}/>
  }
}

export default inlined;