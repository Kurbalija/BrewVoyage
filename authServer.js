// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const login = require('./login');
const cors = require('cors');

app.use(cors());

// Parse incoming JSON data
app.use(express.json());

let refreshTokens = [];

// Route to obtain a new access token using a refresh token
app.post('/token', (req, res) => {
  // Get the refresh token from the request body
  const refreshToken = req.body.token;
  // If no refresh token is provided, send unauthorized status
  if (refreshToken == null) return res.sendStatus(401);
  // If the refresh token is not valid, send forbidden status
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  // Verify the refresh token and generate a new access token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // If token verification fails, send forbidden status
    if (err) return res.sendStatus(403);
    // Generate a new access token for the user
    const accessToken = generateAccessToken({ name: user.name });
    // Send the new access token as a response
    res.json({ accessToken: accessToken });
  });
});

// Route to logout and remove a refresh token
app.delete('/logout', (req, res) => {
  // Remove the specified refresh token from the array
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  // Send a success status without any content
  res.sendStatus(204);
});

// Route to handle user login and issue access and refresh tokens
app.post('/login', (req, res) => {
  // Get the username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Authenticate user
  login.loginUser(username, password, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }

    // Generate an access token and a refresh token
    const accessToken = generateAccessToken({ name: user.username });
    const refreshToken = jwt.sign({ name: user.username }, process.env.REFRESH_TOKEN_SECRET);

    // Store the refresh token
    refreshTokens.push(refreshToken);

    // Send the access token and refresh token as a response
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  });
});

// Route to handle user registration
app.post('/register', (req, res) => {
  // Get the username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Register the user
  login.registerUser(username, password, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // User registered successfully
    res.json({ message: 'User registered successfully' });
  });
});

// Function to generate an access token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`authServer is running at http://localhost:${port}`);
});
