const { Plugin } = require('../db/plugin');

const express = require('express');
const router = express.Router();

router.get('/getplugin', async (req, res) => {
    let plugin = await Plugin.find({ pluginTitle: req.body.pluginTitle });

    if (!plugin) return res.status(404).send('no plugin with that title');
    res.send(plugin);
});

router.get('/getuserplugin', async (req, res) => {
    let plugins = await Plugin.find({ email: req.body.email }).select('-email -username');

    if (!plugins) return res.status(404).send('there is no user with that email');

    res.send(plugins);
});

module.exports = router;