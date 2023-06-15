const http = require('http');
const os = require('os');

const authorName = "Rafał Wróbel";

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const clientIP = req.connection.remoteAddress;
  const date = new Date();
  const clientTime = date.toLocaleString('en-US', { timeZone: 'UTC' });
  const serverTime = date.toLocaleString('en-US', { timeZone: 'UTC' });

  res.end(`<h1>Informacje o kliencie</h1>
    <p>Adres IP klienta: ${clientIP}</p>
    <p>Data i godzina w strefie czasowej klienta: ${clientTime}</p>
    <p>Data i godzina w strefie czasowej serwera: ${serverTime}</p>
  `);

  console.log(`Serwer uruchomiony. Autor: ${authorName}. Port: ${server.address().port}`);
});

server.listen(8000, () => {
  console.log('Serwer nasłuchuje na porcie 8000');
});

