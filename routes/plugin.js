const { Plugin, validatePlugin } = require('../db/plugin');
const { User } = require('../db/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const express = require('express');
const router = express.Router();

router.post('/newplugin', auth, async (req, res) => {
    const { error } = validatePlugin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user.id)
    if (!user) return res.status(400).send('no user with that name');

    let plugin = new Plugin({
        pluginTitle: req.body.pluginTitle,
        description: req.body.description,
        topic: req.body.topic,
        username: user.username,
        email: user.email
    });
    try {
        plugin = await plugin.save();
        res.send(plugin);
    }
    catch (err) {
        res.send(err.message);
    }
});

router.put('/updateplugin', auth, async (req, res) => {
    const { error } = validatePlugin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let plugin = await Plugin.findOneAndUpdate({ pluginTitle: req.body.pluginTitle }, {
        pluginTitle: req.body.pluginTitle,
        description: req.body.description,
        topic: req.body.topic
    }, { new: true });
    if (!plugin) return res.status(404).send('no plugin with that title');
    res.send(plugin);

});



router.get('/getplugins', async (req, res) => {
    let plugins = await Plugin.find().sort('pluginTitle');
    res.send(plugins);
});

router.delete('/deleteplugin', auth, async (req, res) => {
    let usertable = await User.findById(req.user.id)
    if (usertable.email === req.body.email) {
        let plugin = await Plugin.findOneAndDelete({ email: req.body.email, pluginTitle: req.body.pluginTitle });
        if (!plugin) return res.status(404).send('no plugin with that id');
        res.send(plugin);
    } else {
        res.send('You are not allowed to delete this plugin')
    }

});

router.delete('/deletepluginAdmin', [auth, admin], async (req, res) => {
    const result = await Plugin.findOneAndDelete({ email: req.body.email, pluginTitle: req.body.pluginTitle });
    if (!result) res.status(400).send('no plugin with that name');
    res.send(result);
});

module.exports = router;