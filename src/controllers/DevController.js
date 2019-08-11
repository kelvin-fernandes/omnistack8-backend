const axios = require('axios');
const Dev = require('../models/Dev');
const mongoose = require('mongoose');

module.exports = {
    async index(req, res) {
        let { user } = req.headers;

        let loggedDev = await Dev.findById(user);

        let query = {
            $and: [
                {_id: { $ne: mongoose.Types.ObjectId(user) }},
                {_id: { $nin: loggedDev.likes}},
                {_id: { $nin: loggedDev.dislikes}}
            ]
        }

        let users = await Dev.find(query);

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        let devExists = await Dev.findOne({user: username});

        if(devExists) return res.json(devExists);

        let response = await axios.get(`https://api.github.com/users/${username}`)

        let { name, bio, avatar_url: avatar } = response.data;

        let dev = await Dev.create({
            user: username,
            name,
            bio,
            avatar
        });

        return res.json(dev);
    }
}