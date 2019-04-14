var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static('public', options))

app.use('/', proxy({
  // 代理跨域目标接口
  target: 'http://127.0.0.1:4000',
  changeOrigin: true,

  // 修改响应头信息，实现跨域并允许带cookie
  onProxyRes: function(proxyRes, req, res) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1');
    res.header('Access-Control-Allow-Credentials', 'true');
  },

  // 修改响应信息中的cookie域名
  cookieDomainRewrite: '127.0.0.1'  // 可以为false，表示不修改
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
