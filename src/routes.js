const express = require('express'),
      DevController = require('./controllers/DevController'),
      DislikeController = require('./controllers/DislikeController')
      LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ message: `Do you speak Deutsch ${req.query.name}?` });
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:id/likes', LikeController.store);
routes.post('/devs/:id/dislikes', DislikeController.store);

module.exports = routes;
