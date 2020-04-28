const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/plugin')
    .then(console.log('connected successfuly'))
    .catch((err) => console.log("error occured", err.message));

const newPlugin = require('./routes/plugin');
const register = require('./routes/register');
const login = require('./routes/user');
const search = require('./routes/search');


app.use(express.json());
app.use('/plugin', newPlugin);
app.use('/register', register);
app.use('/login', login);
app.use('/search', search);

app.listen(3000, console.log('listening to port 3000'));