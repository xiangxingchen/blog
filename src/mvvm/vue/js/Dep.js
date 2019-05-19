// Dep.js 文件
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}

export default Dep;
