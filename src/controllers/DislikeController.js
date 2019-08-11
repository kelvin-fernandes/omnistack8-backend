const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        let { user } = req.headers;
        let { id: devLiked } = req.params;
        
        let loggedDev = await Dev.findById(user);
        let targetDev = await Dev.findById(devLiked);

        if(!targetDev) return res.status(400).json({ error: "Dev doesn't exists" });

        loggedDev.dislikes.push(targetDev._id);
        
        await loggedDev.save();

        return res.json(loggedDev)
    }
};