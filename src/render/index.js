const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8080;
http.createServer((req, res) => {
  if (req.url == '/a.js') {
    fs.readFile('a.js', 'utf-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      setTimeout(function () {
        res.write(data);
        res.end()
      }, 10000)
    })
  } else if (req.url == '/b.js') {
    fs.readFile('b.js', 'utf-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(data);
      res.end()
    })
  } else if (req.url == '/style.css') {
    fs.readFile('style.css', 'utf-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end()
    })
  } else if (req.url == '/index.html') {
    fs.readFile('index.html', 'utf-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end()
    })
  }
}).listen(port, hostname, () => {
  console.log('Server running at ' + hostname);
});
