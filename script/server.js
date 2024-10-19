const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username', // replace with your MySQL username
    password: 'your_password', // replace with your MySQL password
    database: 'my_database'
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// CRUD operations for appname, assigned, picname, records, and kedb tables
// Get all data from a table
app.get('/api/:table', (req, res) => {
    const { table } = req.params;
    db.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Insert data into a table
app.post('/api/:table', (req, res) => {
    const { table } = req.params;
    const data = req.body;
    db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ id: results.insertId });
    });
});

// Clear all records from a table
app.delete('/api/:table', (req, res) => {
    const { table } = req.params;
    db.query(`DELETE FROM ${table}`, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'All records deleted' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});