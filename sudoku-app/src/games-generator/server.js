const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/writeToFile', (req, res) => {
    const data = req.body;

    // Write data to a JSON file (simplified example)
    fs.writeFileSync(data.filename, JSON.stringify(data.games));

    res.json({ message: 'Data written to file successfully.' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});