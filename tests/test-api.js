import { after, before, test } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import { app } from '../server.js';

let server;
let baseUrl;

before(async () => {
  server = await new Promise((resolve, reject) => {
    const httpServer = app.listen(0, () => resolve(httpServer));
    httpServer.once('error', reject);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Test server did not provide a network address');
  }

  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close(error => (error ? reject(error) : resolve()));
  });
});

test('GET / serves the SPA page', async () => {
  const response = await fetch(`${baseUrl}/`);
  const body = await response.text();

  strictEqual(response.status, 200);
  ok(response.headers.get('content-type')?.includes('text/html'));
  ok(body.includes('<title>Simple SPA - Home</title>'));
});

test('GET /about serves the about page', async () => {
  const response = await fetch(`${baseUrl}/about`);
  const body = await response.text();

  strictEqual(response.status, 200);
  ok(body.includes('<h1>About This Application</h1>'));
});

test('GET /contact serves the contact form', async () => {
  const response = await fetch(`${baseUrl}/contact`);
  const body = await response.text();

  strictEqual(response.status, 200);
  ok(body.includes('<h1>Contact Us</h1>'));
  ok(body.includes('<form>'));
});

test('GET /api/data returns the expected data shape', async () => {
  const response = await fetch(`${baseUrl}/api/data`);
  const data = await response.json();

  strictEqual(response.status, 200);
  ok(response.headers.get('content-type')?.includes('application/json'));
  strictEqual(typeof data.message, 'string');
  ok(!Number.isNaN(Date.parse(data.timestamp)));
  deepStrictEqual(data.data.items, ['Item 1', 'Item 2', 'Item 3']);
});

test('GET /api/users returns the expected users', async () => {
  const response = await fetch(`${baseUrl}/api/users`);
  const data = await response.json();

  strictEqual(response.status, 200);
  strictEqual(data.success, true);
  strictEqual(data.data.length, 3);
  for (const user of data.data) {
    ok(Number.isInteger(user.id));
    strictEqual(typeof user.name, 'string');
    strictEqual(typeof user.email, 'string');
  }
});

test('GET /styles.css serves the stylesheet', async () => {
  const response = await fetch(`${baseUrl}/styles.css`);

  strictEqual(response.status, 200);
  ok(response.headers.get('content-type')?.includes('text/css'));
});

test('GET /app.js serves the client application', async () => {
  const response = await fetch(`${baseUrl}/app.js`);
  const body = await response.text();

  strictEqual(response.status, 200);
  ok(response.headers.get('content-type')?.includes('javascript'));
  ok(body.includes('function loadApiData'));
});

test('unknown routes return a JSON 404 response', async () => {
  const response = await fetch(`${baseUrl}/does-not-exist`);
  const data = await response.json();

  strictEqual(response.status, 404);
  deepStrictEqual(data, {
    error: 'Route not found',
    path: '/does-not-exist'
  });
});
