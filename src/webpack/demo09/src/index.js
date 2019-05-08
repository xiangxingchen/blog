console.log('Hello webpack!');

window.setTimeout(() => {
  import('./utils/math').then(mathUtil => {
  console.log('1 + 2: ' + mathUtil.plus(1, 2));
  });
}, 2000);
