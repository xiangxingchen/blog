const { SyncHook, AsyncParallelHook} = require('tapable');

class Compiler {
  constructor(options) {
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      break: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
    };
    let plugins = options.plugins;
    if (plugins && plugins.length > 0) {
      plugins.forEach(plugin => plugin.apply(this));
    }
  }
  run(){
    console.time('cost');
    this.accelerate('hello')
    this.break()
    this.calculateRoutes('i', 'like', 'tapable')
  }
  accelerate(param){
    this.hooks.accelerate.call(param);
  }
  break(){
    this.hooks.break.call();
  }
  calculateRoutes(){
    const args = Array.from(arguments)
    this.hooks.calculateRoutes.callAsync(...args, err => {
      console.timeEnd('cost');
      if (err) console.log(err)
    });
  }
}

module.exports = Compiler
