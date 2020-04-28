const { User } = require('../db/user');
const auth = require('../middleware/auth')
const express = require('express');
const bcrypt = require('bcrypt');
const joi = require('joi');

const router = express.Router();


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');

    const validpassword = bcrypt.compare(req.body.password, user.password);
    if (!validpassword) return res.status(400).send('invalid email or password');

    res.header('x-auth-token', user.createToken()).send('login successfuly');
});

function validate(user) {
    const schema = {
        email: joi.string().min(5).max(200).required().email(),
        password: joi.string().min(5).max(250).required()
    }
    return joi.validate(user, schema);
}

module.exports = router;