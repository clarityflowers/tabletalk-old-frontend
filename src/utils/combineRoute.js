const combineRoute = (path, dispatch, state, fallback, arg) => {
  const [head, ...tail] = path;
  if (head === undefined || arg[head] === undefined) return fallback(dispatch, state);
  else {
    return arg[head](tail, dispatch, state);
  }
}

export default combineRoute;