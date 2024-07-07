
// const mongoose = require('mongoose');  // Importing mongoose for MongoDB interaction

// // Connecting to the MongoDB database named 'converter' running on localhost
// mongoose.connect('mongodb://localhost:27017/converter');

// const db = mongoose.connection;  // Getting the default connection
// // Binding the error event to console.error to log connection errors
// db.on('error', console.error.bind(console, 'connection error:'));
// // Binding the open event to log a success message when the connection is established
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });







// module.exports = db;  // Exporting the db connection for use in other modules

const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection URI
const mongoURI = 'mongodb+srv://tope:tope@numbersystemsconverter.ienwnb6.mongodb.net/?retryWrites=true&w=majority&appName=NumberSystemsConverter';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

const db = mongoose.connection;

module.exports = db;
