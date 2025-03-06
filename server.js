const express       = require('express');
const cors          = require('cors');
const { Client }    = require('pg');
const bcrypt        = require('bcrypt');
const app           = express();
const port          = 3000;

app.use(cors());
app.use(express.json());

const client = new Client({
    host:       "localhost",
    user:       "postgres",
    port:       5432,
    password:   "790821",
    database:   "postgres"
});

client.connect();

app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
        const result = await client.query(sql, [username, hashedPassword]);

        res.json({ success: true, message: "User registered successfully", userId: result.rows[0].id });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
