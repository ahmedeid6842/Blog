const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { pluginSchem } = require('./plugin');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 200,
        unique: true
    },
    isAdmin: Boolean
});
userSchema.methods.createToken = function () {
    const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.get('jwtkey'));
    return token;
}

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
    const schema = {
        username: joi.string().min(5).max(100).required(),
        password: joi.string().min(5).max(1024).required(),
        email: joi.string().min(10).max(100)
    };
    return joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;