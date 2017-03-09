class Route {
  constructor(path, location, historyPush, historyReplace) {
    this.path = path;
    this.location = location;
    this.historyPush = historyPush;
    this.historyReplace = historyReplace;
    this.name = path[location];
    this.nextName = path[location + 1];
    this.isExact = location == path.length - 1;
  }
  next() {
    let path = this.path.slice(0);
    let location = this.location + 1;
    return new Route(path, location, this.historyPush, this.historyReplace);
  }
  static makePathname(path) {
    let pathname = ''
    let i=0;
    while (i < path.length) {
      pathname += path[i];
      i++;
      if (i < path.length) {
        pathname += '/';
      }
    }
    return pathname;
  }
  static splitPathname(pathname) {
    let path = pathname.split('/');
    if (path[path.length - 1] == '') {
      path = path.slice(0, path.length - 1);
    }
    return path;
  }
  go() {
    this.historyPush(Route.makePathname(this.path.slice(0, this.location + 1)));
  }
  replace() {
    this.historyReplace(Route.makePathname(this.path.slice(0, this.location + 1)));
  }
  push(name) {
    let location = this.location + 1;
    if (this.nextName == name) {
      return new Route(this.path, location, this.historyPush, this.historyReplace);
    }
    else {
      let path = this.path.slice(0, location);
      path.push(name);
      return new Route(path, location, this.historyPush, this.historyReplace);
    }
  }
  pop() {
    let path = this.path.slice(0, this.location);
    let location = this.location - 1;
    return new Route(path, location, this.historyPush, this.historyReplace);
  }
  set(pathname) {
    let path = Route.splitPathname(pathname);
    let location = path.length - 1;
    return new Route(path, location, this.historyPush, this.historyReplace);
  }
}

export default Route;
