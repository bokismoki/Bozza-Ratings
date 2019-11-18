const User = require('../../models/User');
const Movie = require('../../models/Movie');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
    const _id = req.params.id;
    const newUrl = req.body.url;
    const token = req.token;

    try {
        const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id });
        user.profileImage = newUrl;
        const updatedUser = await user.save();

        // Update movie.createdBy.profileImage
        const movies = await Movie.updateMany({ 'createdBy.username': user.username }, { "$set": { "createdBy.profileImage": newUrl } }, { "multi": true });

        res.send(updatedUser.profileImage);
    } catch (error) {
        if (error.message === 'invalid token') {
            res.send({ authorize: 'Authorization Error - Invalid Token' });
        }
    }
};
