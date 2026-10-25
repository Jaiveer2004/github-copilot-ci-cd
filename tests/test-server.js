import http from 'node:http';
import { test } from 'node:test';
import { deepStrictEqual, ok } from 'node:assert/strict';

// Simple test to verify the server responds correctly
test('Server should respond with 200 status', async () => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Test Response</h1>');
  });

  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;

  const response = await fetch(`http://localhost:${port}`);
  ok(response.status === 200);

  server.close();
});

test('Test API endpoint', async () => {
  const server = http.createServer((req, res) => {
    if (req.url === '/api/data') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Test API response' }));
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;

  const response = await fetch(`http://localhost:${port}/api/data`);
  ok(response.status === 200);

  const data = await response.json();
  deepStrictEqual(data.message, 'Test API response');

  server.close();
});