const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./src/routes.js');

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-9ecj6.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333, () => {
    console.log(`server running on port 3333`)
});