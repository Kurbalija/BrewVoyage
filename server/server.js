// Import von Express.js
var express = require('express');
var path = require('path');

var app = express();

// Richtet einen statischen Dateiserver ein
app.use(express.static(path.join(__dirname, 'public')));

// Definiert eine Route für die Seite im ersten Parameter '/'
app.get('/', (req, res) => {
  // Sendet eine definierte HTML Datei als Antwort
  res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/maps', (req, res) => {
  res.sendFile(__dirname + '/public/html/maps.html');
});

app.get('/wiki', (req, res) => {
  res.sendFile(__dirname + '/public/html/wiki.html');
});

app.get('/teas', (req, res) => {
  res.sendFile(__dirname + '/public/html/teas.html');
});

// Startet den Webserver auf Port 8080
app.listen(8080, () => {
  console.log('Server läuft unter http://127.0.0.1:8080');
});