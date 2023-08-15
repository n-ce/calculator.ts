const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const indexHtml = fs.readFileSync('./index.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  }
  else if (req.url === '/style.css') {

    const style = fs.readFileSync('./style.css');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(style);
  }
  else if (req.url === '/script.js') {
    const js = fs.readFileSync('./script.js');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(js);

  }

  else {
    res.writeHead(404);
    res.end("error");
  }
});

server.listen(8080);
console.log('Server started on port 8080');
