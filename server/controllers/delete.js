const Movie = require('../models/Movie');

module.exports = async (req, res) => {
    const _id = req.params.id;
    const movie = await Movie.findByIdAndDelete({ _id });
    res.send(movie);
};