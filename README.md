# Simple SPA Application

A modern Single Page Application (SPA) built with Node.js and Express, featuring server-side rendering and client-side interactivity.

## Features

- **Node.js + Express** backend server
- **ES Modules** (modern JavaScript)
- **RESTful API** endpoints
- **Client-side routing** simulation
- **HTML5 History API** support
- **CSS styling** with responsive design
- **Error handling** middleware
- **Security headers**
- **Unit and integration testing**

## Project Structure

```
/javascript-spa-simple/
├── package.json
├── server.js
├── index.js (main entry)
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── tests/
│   ├── test-server.js
│   └── test-integration.js
└── .gitignore
```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /` - Returns the main SPA page
- `GET /about` - About page with application information
- `GET /contact` - Contact form page
- `GET /api/data` - Returns sample JSON data
- `GET /api/users` - Returns sample user data

## Development

For development with auto-restart:
```bash
npm run dev
```

## Testing

```bash
npm test
```

## License

ISC

## Co-authored-by

Claude Code <noreply@anthropic.com>