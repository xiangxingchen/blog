import CompileUtil from './CompileUtil.js';

// Compile.js 文件
class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    // 如过传入的根元素存在，才开始编译
    if (this.el) {
      // 1、把这些真实的 Dom 移动到内存中，即 fragment（文档碎片）
      let fragment = this.node2fragment(this.el);

      // 2、将模板中的指令中的变量和 {{}} 中的变量替换成真实的数据
      this.compile(fragment);

      // 3、把编译好的 fragment 再塞回页面中
      this.el.appendChild(fragment);

    }
  }

  /* 辅助方法 */
  // 判断是否是元素节点
  isElementNode(node) {
    return node&&node.nodeType === 1;
  }

  isTextNode(node) {
      return node.nodeType == 3;
  }


  // 判断属性是否为指令
  isDirective(name) {
    return name.includes("v-");
  }


  /* 核心方法 */
  // 将根节点转移至文档碎片
  node2fragment(el) {
    // 创建文档碎片
    let fragment = document.createDocumentFragment();
    // 第一个子节点
    let firstChild;

    // 循环取出根节点中的节点并放入文档碎片中
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  // 解析文档碎片
  compile(fragment) {
    // 当前父节点节点的子节点，包含文本节点，类数组对象
    let childNodes = fragment.childNodes;
    let me = this;

    // 转换成数组并循环判断每一个节点的类型
    Array.from(childNodes).forEach(node => {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;

      if (me.isElementNode(node)) {
          me.compileElement(node);

      } else if (me.isTextNode(node) && reg.test(text)) {
        console.log(111, node)
          me.compileText(node, RegExp.$1.trim());
        console.log(2222, node)

      }

      if (node.childNodes && node.childNodes.length) {
          me.compile(node);
      }
    });
  }
  // 编译元素
  compileElement(node) {
    // 取出当前节点的属性，类数组
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      // 获取属性名，判断属性是否为指令，即含 v-
      let attrName = attr.name;

      if (this.isDirective(attrName)) {
        // 如果是指令，取到该属性值得变量在 data 中对应得值，替换到节点中
        let exp = attr.value;

        // 取出方法名
        let [, type] = attrName.split("-");

        // 调用指令对应得方法
        CompileUtil[type](node, this.vm, exp);
      }
    });

  }
  // 编译文本
  compileText(node, exp) {
    CompileUtil["text"](node, this.vm, exp);
  }
}

export default Compile;
