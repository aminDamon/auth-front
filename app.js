const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, HOST, (err) => {
    if (err) { 
      console.log(JSON.stringify(err, null, 2));
    }
    console.log(`Starting Next.js at http://${HOST}:${PORT}`);
  });
}); 