const mongoose = require('mongoose');
const joi = require('joi');

const pluginSchema = new mongoose.Schema({
    pluginTitle: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 255,

    },
    topic: {
        type: String,
        minlength: 20,
    },
    username: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 150,
        required: true
    }
});
const Plugin = mongoose.model('Plugins', pluginSchema);
function validatePlugin(plugin) {
    const schema = {
        pluginTitle: joi.string().min(5).max(100).required(),
        description: joi.string().min(5).max(255),
        topic: joi.string().min(20),
    }
    return joi.validate(plugin, schema);
}

exports.Plugin = Plugin;
exports.pluginSchema = pluginSchema;
exports.validatePlugin = validatePlugin;