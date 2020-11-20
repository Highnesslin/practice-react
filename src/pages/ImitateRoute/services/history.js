//
class History {
  constructor() {
    this.activePath = '';
    this.listeners = [];
    this.setActivePath = this.setActivePath.bind(this);
  }

  setActivePath(path) {
    this.activePath = path;
    this.notifyAllListeners();
  }

  appendListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(item => item !== callback);
    };
  }
  notifyAllListeners() {
    this.listeners.forEach(update => update());
  }
}
function createImitateRouter() {
  return new History();
}
export { createImitateRouter };
