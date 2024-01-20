const mongoose = require('mongoose');

const connectDatabase = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on('error', (err) => {
        console.error('Database connection error:', err);
    });

    connection.once('open', () => {
        console.log('Database connected');
    });
};

module.exports = {
    connectDatabase
};