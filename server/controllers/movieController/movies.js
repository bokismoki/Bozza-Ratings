const Movie = require('../../models/Movie');

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getMovies = async (req, res) => {
    const movies = await Movie.find({}).sort({ createdOn: 'desc' });
    res.send(movies);
};

exports.postMovie = async (req, res) => {
    const { title, description, image, createdBy } = req.body;
    const token = req.token;

    try {
        const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);
        const movie = new Movie({
            title,
            description,
            image,
            createdBy
        });
        const newMovie = await movie.save();
        res.send(newMovie);
    } catch (error) {
        console.log(error)
        if (error.message === 'invalid token') {
            res.send({ authorize: 'Authorization Error - Invalid Token' });
        } else {
            res.send({ message: 'You description should be at least 25 characters long.' });
        }
    }
};