'use strict';

const os = require('os');
const express = require('express');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = '0.0.0.0';
const startedAt = new Date().toISOString();

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello, World!</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Node.js ${process.version} | port ${PORT} | host ${os.hostname()} | started ${startedAt}</p>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`App is running on ${HOST}:${PORT}`);
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT', () => server.close(() => process.exit(0)));
