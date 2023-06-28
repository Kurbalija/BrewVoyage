const sqlite3 = require('sqlite3').verbose();

// Connect to the login database
const db = new sqlite3.Database('database/login.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the login database.');
    }
});

// Create the "users" table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users
    (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )
`, (err) => {
    if (err) {
        console.error('Failed to load or create table:', err.message);
    } else {
        console.log('Table "users" loaded or created successfully.');
    }
});

// Check if a user with the given username exists
function userExists(username, callback) {
    const query = `SELECT *
                   FROM users
                   WHERE username = ?`;

    db.get(query, [username], (err, row) => {
        if (err) {
            console.error('Failed to fetch user:', err.message);
            callback(err, null);
        } else {
            if (row) {
                console.log('User already exists');
                callback(null, true);
            } else {
                console.log('User does not exist');
                callback(null, false);
            }
        }
    });
}

// Login user and invoke the callback with user data if successful
function loginUser(username, password, callback) {
    const query = `SELECT *
                   FROM users
                   WHERE username = ?
                     AND password = ?`;

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Failed to fetch user:', err.message);
            callback(err, null);
        } else {
            if (row) {
                console.log('User logged in successfully');
                callback(null, row);
            } else {
                console.log('Invalid username or password');
                callback(new Error('Invalid username or password'), null);
            }
        }
    });
}

// Register a new user if the username is available
function registerUser(username, password, callback) {
    userExists(username, (err, exists) => {
        if (err) {
            callback(err);
            return;
        }

        if (exists) {
            console.error('Failed to register user: user already exists');
            callback(new Error('User already exists'));
            return;
        }

        const query = `INSERT INTO users (username, password)
                       VALUES (?, ?)`;

        db.run(query, [username, password], (err) => {
            if (err) {
                console.error('Failed to register user:', err.message);
                callback(err);
            } else {
                console.log('User registered successfully');
                callback(null);
            }
        });
    });
}

function updateUser(username, newData, callback) {
    // Update user query
    const query = `UPDATE users SET password = ? WHERE username = ?`;
  
    db.run(query, [newData.password, username], (err) => {
      if (err) {
        console.error('Failed to update user:', err.message);
        callback(err);
      } else {
        console.log('User updated successfully');
        callback(null);
      }
    });
  }  

// Export the functions to be used by other modules
module.exports = {
    loginUser,
    registerUser,
    userExists,
    updateUser
};