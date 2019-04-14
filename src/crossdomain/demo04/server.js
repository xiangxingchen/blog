// 服务器
const http = require("http");
const server = http.createServer();
const qs = require("querystring");

server.on("request", function(req, res) {
  var params = qs.parse(req.url.split('?')[1]);
  console.log(req.url, params);
  // 向前台写 cookie
  res.writeHead(200, {
    "Set-Cookie": "l=a123456;Path=/;Domain=127.0.0.1;HttpOnly" // HttpOnly：脚本无法读取
  });

  res.write(JSON.stringify({ data: 'I LOVE YOU', ...params }));
  res.end();
});

server.listen("4000");
console.log('listen 4000...')
