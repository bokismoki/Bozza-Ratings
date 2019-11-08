const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECT, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) {
        return console.log('You can\'t connect to the database');
    }
    console.log('Connected to the database');
})