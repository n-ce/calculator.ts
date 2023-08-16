const http = require('node:http');
const fs = require('node:fs');
const port = 8080;
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === 'index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('./index.html', 'utf8'));
  }
  else if (req.url === '/style.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(fs.readFileSync('./style.css'));
  }
  else if (req.url === '/script.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(fs.readFileSync('./script.js'));
  }
  else {
    res.writeHead(404);
    res.end("error");
  }
});
server.listen(port);
console.log(`Server started on http://localhost:${port} .`);
