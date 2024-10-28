import http from 'http';
import * as fs from 'fs';

// const server = http.createServer((req, resp) => {
//   console.log(req.url);
//   resp.writeHead(200,'content-type: text/html');
//   resp.write('<h1>Hola mundo desde servidor</h1>');
//   resp.end();
// });

// server.listen(8080, () => {
//   console.log('server Online in port : 8080');
// });

const server = http.createServer((req, resp) => {
  const content = fs.readFileSync('./public/index.html', 'utf-8');
  if (req.url === '/') {
    resp.writeHead(200, 'content-type: index/html');
    resp.write(content);
    resp.end();
  } else {
    resp.writeHead(404, 'content-type: index/html');
    resp.end();
  }
});

server.listen(8080, () => {
  console.log('server Online in port : 8080');
});

