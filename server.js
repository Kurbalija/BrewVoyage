// Import von Express.js
var express = require('express');
var path = require('path');

var app = express();

// Richtet einen statischen Dateiserver ein
app.use(express.static(path.join(__dirname, 'files')));

// Definiert eine Route für die Seite im ersten Parameter '/'
app.get('/', (req, res) => {
  // Sendet eine definierte HTML Datei als Antwort
  res.sendFile(__dirname + '/files/html/login.html');
});

app.get('/home', (req, res) => {
  // Sendet eine definierte HTML Datei als Antwort
  res.sendFile(__dirname + '/files/html/index.html');
});

app.get('/test', (req, res) => {
  // Sendet eine definierte HTML Datei als Antwort
  res.sendFile(__dirname + '/files/html/test.html');
});

// Startet den Webserver auf Port 8080
app.listen(8080, () => {
  console.log('Server läuft unter http://127.0.0.1:8080');
});