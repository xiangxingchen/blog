import join from 'lodash/join';
import Angle from '../src/image/angle.jpg';
import './style.css';
import data from '../src/data.xml';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('header');

  let angleImg = new Image();
  angleImg.src = Angle;

  element.appendChild(angleImg);
  console.log(data);
  return element;
}

document.body.appendChild(component());
