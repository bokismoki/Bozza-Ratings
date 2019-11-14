// IMPORTS
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

require('./db/mongoose');

// SERVER INIT
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ROUTES
const signupRoute = require('./routes/userRoute/signup');
app.use('/signup', signupRoute);

const loginRoute = require('./routes/userRoute/login');
app.use('/login', loginRoute);

const moviesRoute = require('./routes/movieRoute/movies');
app.use('/movies', moviesRoute);

const userRoute = require('./routes/userRoute/user');
app.use('/user', userRoute);

const deleteRoute = require('./routes/movieRoute/delete');
app.use('/delete', deleteRoute);

// SOCKET.IO
io.on('connection', socket => {
    socket.on('newUserConnected', user => {
        console.log(`${user} conneected`);
        io.emit('shareNewUser', user);
    })

    socket.on('newMsg', msg => {
        io.emit('sendNewMsg', {
            username: msg.username,
            profileImage: msg.profileImage,
            message: msg.message
        });
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    })
});

// SERVER LISTENING
http.listen(process.env.PORT || 3000, () => {
    console.log('Server is up and running on port: ' + (process.env.PORT || 3000));
});