const User = require('../../models/User');

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            // Should only send the token with the payload of _id.
            res.send({ username: user.username, profileImage: user.profileImage, _id: user._id, token });
        } else {
            res.send({ message: 'Wrong email or password.' });
        }
    } else {
        res.send({ message: 'Wrong email or password.' });
    }
};