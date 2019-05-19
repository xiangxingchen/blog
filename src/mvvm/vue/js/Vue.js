import Observer from './Observer.js';
import Compile from './Compile.js';

// Vue.js 文件
class Vue {
  constructor(options) {
    // 先把 el 和 data 挂在 Vue 实例上
    this.$el = options.el;
    this.$data = options.data;

    // 如果有要编译的模板就开始编译
    if (this.$el) {
      // 数据劫持，就是把对象所有的属性添加 get 和 set
      new Observer(this.$data);

      // 将数据代理到实例上
      this.proxyData(this.$data);

      // 用数据和元素进行编译
      new Compile(this.$el, this);
    }
  }
  proxyData(data) { // 代理数据的方法
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        }
      });
    });
  }
}

export default Vue;
