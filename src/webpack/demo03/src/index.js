import join from 'lodash/join';
import printMe from './print';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);
  return element;
}
let element = component();

document.body.appendChild(element);

if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     document.body.removeChild(element);
     element = component(); // 重新渲染页面后，component 更新 click 事件处理
     document.body.appendChild(element);
   })
}
