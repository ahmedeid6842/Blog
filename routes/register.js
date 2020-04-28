const { User, validateUser } = require('../db/user');

const express = require('express');
const becrypt = require('bcrypt');
const lodash = require('lodash');

const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("email already registered");


    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await becrypt.genSalt(10);
    user.password = await becrypt.hash(user.password, salt);
    await user.save();
    try {
        const token = user.createToken();
        res.header('x-auth-token', token).send(lodash.pick(user, ['username', 'email']));
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;

