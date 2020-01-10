const db = require('../database');

exports.get = async (_, res) => {
  try {
    const games = await db.all('SELECT * from games');
    return res.status(200).json(games);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await db.get('SELECT * from games where id = $id', { $id: id });

    if (!game) return res.status(400).send('Bad request');

    return res.status(200).json(game);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.addGame = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).send('Bad request');

    const id = await db.run(`INSERT INTO games (name) VALUES ($name)`, {
      $name: name,
    });
    return res.status(200).json({ id, name });
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};
