'use strict'

const filter = (object, ...props) => {
  let result = {};
  const keys = Object.keys(object);
  for (let i=0; i < keys.length; i++) {
    const key = keys[i];
    if (!props.includes(key)) {
      result[key] = object[key];
    }
  }
  return result;
}

export default filter;
