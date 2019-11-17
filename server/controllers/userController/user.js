const User = require('../../models/User');
const Movie = require('../../models/Movie');

module.exports = async (req, res) => {
    const _id = req.params.id;
    const newUrl = req.body.url;

    const user = await User.findOne({ _id });
    user.profileImage = newUrl;
    const updatedUser = await user.save();
    
    // Update movie.createdBy.profileImage
    const movies = await Movie.updateMany({ 'createdBy.username': user.username }, { "$set": { "createdBy.profileImage": newUrl } }, { "multi": true });
    
    res.send(updatedUser.profileImage);
};
