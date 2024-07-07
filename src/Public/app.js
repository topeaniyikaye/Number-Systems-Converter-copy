const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const converter = require('./converter');  // Importing module for conversion functions
const db = require('./db');  // Importing database module
const History = require('./history');  // Importing History model

const app = express();  // Creating express application
app.use(bodyParser.json());  // Parsing JSON bodies for POST requests
app.use(cors());  // Enabling Cross-Origin Resource Sharing

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST endpoint for conversion
app.post('/convert', async (req, res) => {
    const { number, fromBase, toBase } = req.body;

    let decimal;
    // Converting input number from specified base to decimal
    switch (fromBase) {
        case 'binary':
            decimal = converter.binaryToDecimal(number);
            break;
        case 'hexadecimal':
            decimal = converter.hexadecimalToDecimal(number);
            break;
        case 'octal':
            decimal = converter.octalToDecimal(number);
            break;
        default:
            decimal = parseInt(number, 10);  // Assuming input is already in decimal
    }

    let result;
    // Converting decimal number to specified base
    switch (toBase) {
        case 'binary':
            result = converter.decimalToBinary(decimal);
            break;
        case 'hexadecimal':
            result = converter.decimalToHexadecimal(decimal);
            break;
        case 'octal':
            result = converter.decimalToOctal(decimal);
            break;
        default:
            result = decimal;  // Returning decimal if base not recognized
    }

    // Saving conversion history to database
    const historyEntry = new History({ number, fromBase, toBase, result: result.toString() });
    await historyEntry.save();

    res.json({ result });  // Sending JSON response with conversion result
});

// GET endpoint for retrieving conversion history
app.get('/history', async (req, res) => {
    // Fetching last 10 history entries sorted by date
    const history = await History.find().sort({ date: -1 }).limit(10);
    res.json(history);  // Sending JSON response with history data
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // Logging server start message
});