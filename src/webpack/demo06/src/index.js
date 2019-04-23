import data from './foo.xml';

function component() {
  var element = document.createElement('div');
  element.innerHTML = data.note.body;
  element.classList.add('header');
  console.log(data);
  return element;
}

document.body.appendChild(component());
