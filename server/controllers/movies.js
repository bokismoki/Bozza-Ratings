const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
    const movies = await Movie.find({}).sort({ createdOn: 'desc' });
    res.send(movies);
};

exports.postMovie = async (req, res) => {
    const { title, description, image, createdBy } = req.body;
    try {
        const movie = new Movie({
            title,
            description,
            image,
            createdBy
        });
        const newMovie = await movie.save();
        res.send(newMovie);
    } catch (err) {
        res.send({ message: 'You description should be at least 25 characters long.' });
    }
};