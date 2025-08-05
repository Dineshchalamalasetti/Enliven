const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'edutech',
    password: 'yourpassword',
    port: 5432,
});

// Get all courses
app.get('/api/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add to cart (mock, as cart is client-side)
app.post('/api/cart', (req, res) => {
    res.json({ success: true });
});

// Get analytics (mock)
app.get('/api/analytics', (req, res) => {
    res.json({ progress: 72, quizScores: 88, completedCourses: 3 });
});

// Simulate payment
app.post('/api/payment', (req, res) => {
    res.json({ success: true, message: 'Transaction successful!' });
});

app.listen(port, () => {
    console.log(`EDUTECH backend running at http://localhost:${port}`);
});