const express = require('express');
const path = require('path');
const {loginUser, registerUser} = require('./login.js');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({extended: true}));

// Define routes and corresponding HTML files
const routes = [
    {path: '/', file: 'login.html'},
    {path: '/home', file: 'index.html'},
    {path: '/maps', file: 'maps.html'},
    {path: '/wiki', file: 'wiki.html'},
    {path: '/teas', file: 'teas.html'},
];

// Set up routes dynamically
routes.forEach(route => {
    app.get(route.path, (req, res) => {
        // Send the corresponding HTML file as the response
        res.sendFile(path.join(__dirname, 'public', 'html', route.file));
    });
});

// Handle authentication requests
app.post('/login', handleAuth(loginUser, 'User logged in successfully', 'Invalid username or password'));
app.post('/signup', handleAuth(registerUser, 'User registered successfully', 'Failed to register user'));

// Function to handle authentication requests
function handleAuth(method, successMsg, failureMsg) {
    return (req, res) => {
        const {username, password} = req.body;
        // Call the provided method for authentication
        method(username, password, (err) => {
            if (err) {
                // Return error response if authentication fails
                res.json({success: false, message: `${failureMsg}: ${err.message}`});
            } else {
                // Return success response if authentication succeeds
                res.json({success: true, message: successMsg});
            }
        });
    };
}

const port = 8080;
// Start the server
app.listen(port, () => {
    console.log(`Server läuft unter http://127.0.0.1:${port}`);
});