const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
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

const wss = new WebSocket.Server({ server });

const watchedFiles = ['./index.html', './style.css', './script.js'];

watchedFiles.forEach(file => {
  fs.watch(file, (eventType, filename) => {
    if (eventType === 'change') {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('reload');
        }
      });
    }
  });
});

server.listen(port);
console.log(`Server started on http://localhost:${port} .`);