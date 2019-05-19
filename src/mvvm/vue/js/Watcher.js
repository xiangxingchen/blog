import CompileUtil from './CompileUtil.js';
import Dep from './Dep.js';

// Watcher.js 文件
class Watcher {
  constructor(vm, exp, callback) {
    this.vm = vm;
    this.exp = exp;
    this.callback = callback;

    // 更改前的值
    this.value = this.get();
  }
  get() {
    // 将当前的 watcher 添加到 Dep 类的静态属性上
    Dep.target = this;

    // 获取值触发数据劫持
    let value = CompileUtil.getVal(this.vm, this.exp);

    // 清空 Dep 上的 Watcher，防止重复添加
    Dep.target = null;
    return value;
  }
  update() {
    // 获取新值
    let newValue = CompileUtil.getVal(this.vm, this.exp);
    // 获取旧值
    let oldValue = this.value;

    // 如果新值和旧值不相等，就执行 callback 对 dom 进行更新
    if(newValue !== oldValue) {
      this.callback.call(this.vm, newValue);
    }
  }
}

export default Watcher;
