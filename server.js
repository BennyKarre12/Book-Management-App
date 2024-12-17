const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8088;

// Middleware
app.use(express.json()); // Parses JSON payloads
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Database Connection
const db = new sqlite3.Database('./database/books.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// API Endpoints
// Get all books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM Books', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM Books WHERE BookID = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

// Add a new book
app.post('/books', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    db.run(
        'INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)',
        [Title, AuthorID, GenreID, Pages, PublishedDate],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ BookID: this.lastID });
            }
        }
    );
});

// Update an existing book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    db.run(
        'UPDATE Books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?',
        [Title, AuthorID, GenreID, Pages, PublishedDate, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'Book updated successfully' });
            }
        }
    );
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Books WHERE BookID = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Book deleted successfully' });
        }
    });
});

// Serve the React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all for frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Create table if it doesn't exist
db.run(
    `CREATE TABLE IF NOT EXISTS Books (
        BookID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        AuthorID INTEGER NOT NULL,
        GenreID INTEGER NOT NULL,
        Pages INTEGER NOT NULL,
        PublishedDate TEXT NOT NULL
    )`
);

// Add a new book
app.post('/books', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;

    if (!Title || !AuthorID || !GenreID || !Pages || !PublishedDate) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [Title, AuthorID, GenreID, Pages, PublishedDate], function (err) {
        if (err) {
            console.error('Error adding book:', err.message);
            return res.status(500).json({ error: 'Failed to add book.' });
        }
        res.status(201).json({ message: 'Book added successfully!', BookID: this.lastID });
    });
});

const PORT = 8088;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
