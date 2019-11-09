const User = require('../../models/User');

const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const { username, email, password } = req.body;
    const isUsed = await User.findOne({ email });

    if (isUsed) {
        res.send({ message: 'This email is already in use.' });
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                email,
                password: hashedPassword
            });
            const newUser = await user.save();
            res.send('New acount has been created.');
        } catch (err) {
            res.send({ message: 'Your username should be at least 5 characters long.' })
        }
    }
};