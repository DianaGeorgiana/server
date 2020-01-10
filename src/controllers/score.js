const db = require('../database');

exports.get = async (_, res) => {
  try {
    const score = await db.all('SELECT * from score');
    return res.status(200).json(score);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const score = await db.get('SELECT * from score where id = $id', { $id: id });

    // if (!score) return res.status(400).send('Bad request');

    return res.status(200).json(score);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.addScore = async (req, res) => {
  try {
    const { userId, gameId, val } = req.body;

    if (!userId || !gameId || !val) return res.status(400).send('Bad request');

    const id = await db.run(
      `INSERT INTO score (userId, gameId, val) VALUES ($userId, $gameId, $val)`,
      {
        $userId: userId,
        $gameId: gameId,
        $val: val,
      },
    );

    return res.status(200).json({ id, userId, gameId, val });
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.topPlayers = async (req, res) => {
  try {
    const { gameId } = req.params;
    const players = await db.all(
      `SELECT * FROM score where gameId = $gameId group by userId order by max(val) DESC LIMIT 10 `,
      { $gameId: gameId },
    );
    return res.status(200).json(players);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.mostPlayedGames = async (_, res) => {
  try {
    const players = await db.all(
      `SELECT * , count(*) from score group by  userId  order by count(userId) desc limit 5`,
    );
    return res.status(200).json(players);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.getScoreGameId = async (req, res) => {
  try {
    const { gameId, page } = req.body;
    const rowsToRead = 2;
    const offset = (page - 1) * rowsToRead;
    const scores = await db.all(
      `select * from score where gameId = $gameId limit $offset, $rowsToRead`,
      {
        $gameId: gameId,
        $offset: offset,
        $rowsToRead: rowsToRead,
      },
    );
    return res.status(200).json(scores);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};
