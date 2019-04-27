const Compiler = require('./compiler')

class MyPlugin{
  constructor() {

  }
  apply(conpiler){//接受 compiler参数
    conpiler.hooks.break.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));
    conpiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
    conpiler.hooks.calculateRoutes.tapAsync("calculateRoutes tapAsync", (source, target, routesList, callback) => {
      setTimeout(() => {
        console.log(`tapAsync to ${source}${target}${routesList}`)
        callback();
      }, 2000)
    });
  }
}


//这里类似于webpack.config.js的plugins配置
//向 plugins 属性传入 new 实例

const myPlugin = new MyPlugin();

const options = {
  plugins: [myPlugin]
}
let compiler = new Compiler(options)
compiler.run()
