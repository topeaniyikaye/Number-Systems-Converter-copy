const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    number: String,
    fromBase: String,
    toBase: String,
    result: String,
    date: { type: Date, default: Date.now },
});

const History = mongoose.model('History', historySchema);

module.exports = History;
