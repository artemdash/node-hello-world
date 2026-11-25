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
  <title>Hello, world!</title>
  <style>
    body {
      font-family: Verdana, sans-serif;
    }
  </style>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>Node.js ${process.version} | started ${startedAt}</p>
  <p>Health page: <a target="_blank" href="/health"></a></p>
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
