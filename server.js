const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { WebSocketServer } = require('node:ws');

const port = 8080;
const server = http.createServer((req, res) => {
  const filePath = req.url === '/' ? './index.html' : '.' + req.url;
  const extname = path.extname(filePath);
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
  }[extname] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

const watchedFiles = ['./index.html', './style.css', './script.js'];

watchedFiles.forEach(file => {
  fs.watch(file, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(`${filename} has changed. Notifying clients...`);
      wss.clients.forEach(client => client.send('reload'));
    }
  });
});