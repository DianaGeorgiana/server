const aboutController = require('../controllers/about');
const noteController = require('../controllers/note');
const usersController = require('../controllers/users');
const gamesController = require('../controllers/games');
const scoreController = require('../controllers/score');

module.exports = (app) => {
  /**
   * @api {get} /about Retrieve service info
   * @apiVersion 1.0.0
   * @apiName About
   * @apiGroup About
   * @apiDescription Retrieves the service's information.
   *
   * @apiExample {curl} Example usage:
   * curl --location --request GET 'http://localhost:8080/about'
   *
   * @apiSuccess {String} description Service description.
   *
   */
  app.get('/about', aboutController.get);

  app.get('/users', usersController.get);

  app.get('/users/:id', usersController.getUserById);

  app.post('/users', usersController.post);

  app.put('/note/:id', noteController.put);

  app.delete('/users/:id', usersController.delete);

  app.get('/games', gamesController.get);

  app.get('/games/:id', gamesController.getGameById);

  app.post('/games', gamesController.addGame);

  app.get('/score', scoreController.get);

  app.get('/score/:id', scoreController.getById);

  app.post('/score', scoreController.addScore);

  app.get('/top/:gameId', scoreController.topPlayers);

  app.get('/played', scoreController.mostPlayedGames);

  app.get('/scoreId', scoreController.getScoreGameId);
};
