// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Parse incoming JSON data
app.use(express.json());

// Middleware function to authenticate the token
function authenticateToken(req, res, next) {

  const token = req.cookies?.accessToken;

  console.log(token);
  // Get the authorization header
  // const authHeader = req.headers['authorization'];
  // // Extract the token from the header
  // const token = authHeader && authHeader.split(' ')[1];
  // If no token is found, send unauthorized status
  if (token == null) return res.sendStatus(401);

  // Verify the token using the secret from the environment variables
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    // If token verification fails, send forbidden status
    if (err) return res.sendStatus(403);
    // Store the user data in the request object
    req.user = user;
    // Call the next middleware or route handler
    next();
  });
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Define routes and corresponding HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/home', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/maps', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'maps.html'));
});

app.get('/wiki', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'wiki.html'));
});

app.get('/teas', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'teas.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});