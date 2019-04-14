var http = require('http');
var socket = require('socket.io');

// 启http服务
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-type': 'text/html'
  });
  res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');

// 监听socket连接
socket.listen(server).on('connection', function(client) {
  // 接收信息
  client.on('message', function(msg) {
    client.send('hello：' + msg);
    console.log('data from client: ---> ' + msg);
  });

  // 断开处理
  client.on('disconnect', function() {
    console.log('Client socket has closed.');
  });
});
