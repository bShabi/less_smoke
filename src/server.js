// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());

// Read data from the JSON file
app.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update data in the JSON file
app.put('/data', async (req, res) => {
    try {
        const newData = req.body;
        await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf-8');
        res.json(newData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
