const sqlite3 = require('sqlite3').verbose();

// Connect to the login database
const db = new sqlite3.Database('server/database/login.db', (err) => {
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