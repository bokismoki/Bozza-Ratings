const User = require('../models/User');

module.exports = async (req, res) => {
    const _id = req.params.id;
    const newUrl = req.body.url;

    const user = await User.findOne({ _id });
    user.profileImage = newUrl;
    const updatedUser = await user.save();
    res.send(updatedUser.profileImage);
};