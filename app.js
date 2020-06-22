const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/radio');
mongoose.set('useFindAndModify', false);




var cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT',
        'PATCH'
    ],
    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));

app.use('/person', require('./routes/person'));

app.listen(8000);

module.exports = app;


