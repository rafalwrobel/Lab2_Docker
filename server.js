const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  const clientIP = req.connection.remoteAddress;

  // Wywołaj publiczne API GeoJS dla adresu IP klienta
  const apiURL = `https://get.geojs.io/v1/ip/geo/${clientIP}.json`;
  https.get(apiURL, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      // Parsowanie odpowiedzi API
      const responseData = JSON.parse(data);

      // Pobierz strefę czasową z odpowiedzi API
      const clientTimezone = responseData.timezone;

      // Pobierz bieżącą datę i czas
      const currentDateTime = new Date();

      // Konwertuj bieżącą datę i godzinę do strefy czasowej klienta
      const clientDateTime = new Date(currentDateTime.toLocaleString('en-US', { timeZone: clientTimezone }));

      // Wygeneruj treść strony informacyjnej dla klienta
      const pageContent = `<html><body>
        <h1>Witaj, klient!</h1>
        <p>Twój adres IP: ${clientIP}</p>
        <p>Aktualna data i godzina w Twojej strefie czasowej (${clientTimezone}): ${clientDateTime}</p>
        </body></html>`;

      // Ustaw nagłówki odpowiedzi
      res.writeHead(200, { 'Content-Type': 'text/html' });

      // Wyślij zawartość strony do klienta
      res.write(pageContent);
      res.end();
    });
  });
});

// Określ port, na którym serwer ma nasłuchiwać
const port = 8000;

// Uruchom serwer na określonym porcie
server.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});

