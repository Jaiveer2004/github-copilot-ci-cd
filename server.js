import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from Express API!',
    timestamp: new Date().toISOString(),
    data: {
      title: 'Simple SPA',
      items: ['Item 1', 'Item 2', 'Item 3']
    }
  });
});

app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>About - Simple SPA</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div class="container">
          <h1>About This Application</h1>
          <p>This is a simple Single Page Application built with Node.js and Express.</p>
          <p>It uses modern ES modules and follows best practices for web development.</p>
        </div>
        <script src="/app.js"></script>
      </body>
    </html>
  `);
});

app.get('/contact', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Contact - Simple SPA</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div class="container">
          <h1>Contact Us</h1>
          <form>
            <input type="text" placeholder="Name" required>
            <input type="email" placeholder="Email" required>
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <script src="/app.js"></script>
      </body>
    </html>
  `);
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json({ success: true, data: users });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export { app };

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}