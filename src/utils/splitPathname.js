export default (pathname) => {
  let path = pathname.split('/');
  if (path[path.length - 1] === '') {
    path = path.slice(0, path.length - 1);
  }
  return path;
}