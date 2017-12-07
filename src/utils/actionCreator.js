const actionCreator = (type, ...params) => (args) => {
  const values = params.reduce((accumulator, value) =>  ({[value]: args[value], ...accumulator}), {});
  return {type, ...values};
}

export default actionCreator;