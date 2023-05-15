//Import von Express.js
var express = require('express');

var app = express();

// Definiert eine Route für die Seite im ersten Parameter '/' = Startseite
app.get('/', (req, res) => {
  // Sendet eine definierte HTML Datei als Antwort
  res.sendFile(__dirname + '/files/index.html');
});

app.get('/one', (req, res) => {
  res.sendFile(__dirname + '/files/one.html');
});

app.get('/two', (req, res) => {
  res.sendFile(__dirname + '/files/two.html');
});

// Startet den Webserver auf Port 8080
app.listen(8080, () => {
  console.log('Server läuft unter http://127.0.0.1:8080');
});