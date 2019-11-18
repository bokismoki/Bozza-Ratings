const Movie = require('../../models/Movie');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
    const _id = req.params.id;
    const token = req.token;

    try {
        const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);
        const movie = await Movie.findByIdAndDelete({ _id });
        res.send(movie);
    } catch (error) {
        if (error.message === 'invalid token') {
            res.send({ authorize: 'Authorization Error - Invalid Token' });
        }
    }
};