const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const converter = require('./converter');
const db = require('./db');
const History = require('./history');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/convert', async (req, res) => {
    const { number, fromBase, toBase } = req.body;

    let decimal;
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
            decimal = parseInt(number, 10);
    }

    let result;
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
            result = decimal;
    }

    const historyEntry = new History({ number, fromBase, toBase, result: result.toString() });
    await historyEntry.save();

    res.json({ result });
});

app.get('/history', async (req, res) => {
    const history = await History.find().sort({ date: -1 }).limit(10);
    res.json(history);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
