class EndWebpackPlugin {

  constructor(doneCallback, failCallback) {
    // 存下在构造函数中传入的回调函数
    this.doneCallback = doneCallback;
    this.failCallback = failCallback;
  }

  apply(compiler) {
    compiler.hooks.done.tab('EndWebpackPlugin', (stats) => {
      // 在 done 事件中回调 doneCallback
      this.doneCallback(stats);
    });
    compiler.hooks.failed.tab('EndWebpackPlugin', (err) => {
      // 在 failed 事件中回调 failCallback
      this.failCallback(err);
    });
  }
}
// 导出插件
module.exports = EndWebpackPlugin;
