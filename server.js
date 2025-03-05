const express       = require('express');
const cors          = require('cors');
const { Client }    = require('pg');

const app   = express();
const port  = 3000;

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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
