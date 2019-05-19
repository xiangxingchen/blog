import Watcher from './Watcher.js';

// CompileUtil.js 文件
let CompileUtil = {};

// 更新节点数据的方法
CompileUtil.updater = {
  // 文本更新
  textUpdater(node, value) {
    node.textContent = value;
  },
  // 输入框更新
  modelUpdater(node, value) {
    node.value = value;
  }
};
// CompileUtil.js 文件
// 获取 data 值的方法
CompileUtil.getVal = function (vm, exp) {
  var val = vm;
  exp = exp.split('.');
  exp.forEach(function(k) {
      val = val[k];
  });
  return val;
};

// 设置 data 值的方法
CompileUtil.setVal = function (vm, exp, newVal) {
  var val = vm;
  exp = exp.split('.');
  exp.forEach(function(k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
          val = val[k];
      } else {
          val[k] = newVal;
      }
  });
}
// CompileUtil.js 文件
// 处理 v-model 指令的方法
CompileUtil.model = function (node, vm, exp) {
  // 获取赋值的方法
  let updateFn = this.updater["modelUpdater"];

  // 获取 data 中对应的变量的值
  let value = this.getVal(vm, exp);

  // 添加观察者，作用与 text 方法相同
  new Watcher(vm, exp, newValue => {
    updateFn && updateFn(node, newValue);
  });

  // v-model 双向数据绑定，对 input 添加事件监听
  node.addEventListener('input', e => {
    // 获取输入的新值
    let newValue = e.target.value;
      if (value === newValue) {
        return;
    }

    // 更新到节点
    this.setVal(vm, exp, newValue);
    value = newValue;
  });

  // 第一次设置值
  updateFn && updateFn(node, value);
};
// CompileUtil.js 文件
// 处理文本节点 {{}} 的方法
CompileUtil.text = function (node, vm, exp) {
  // 获取赋值的方法
  let updateFn = this.updater["textUpdater"];

  // 获取 data 中对应的变量的值
  let value = this.getVal(vm, exp);

  new Watcher(vm, exp, newValue => {
    // 如果数据发生变化，重新获取新值
    updateFn && updateFn(node, newValue);
  });

  // 第一次设置值
  updateFn && updateFn(node, value);
};

export default CompileUtil;
