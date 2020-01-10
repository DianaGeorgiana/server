const db = require('../database');

exports.get = async (_, res) => {
  try {
    const users = await db.all('SELECT * from users');
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await db.all(
      'SELECT *  from users INNER JOIN score on score.userId = $id and users.id = $id',
      { $id: id },
    );
    console.log(user);
    if (!user) return res.status(400).send('Bad request');

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.post = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) return res.status(400).send('Bad request');
    const id = await db.run(
      `INSERT INTO users(name, email, password) VALUES ($name, $email, $password)`,
      {
        $name: name,
        $email: email,
        $password: password,
      },
    );

    return res.status(200).json({ id, name, email, password });
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.delete = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    if (!id) return res.status(400).send('Bad request');

    await db.run(`DELETE FROM users WHERE id = $id`, {
      $id: id,
    });

    return res.status(200).send('OK');
  } catch (e) {
    return res.status(500).send('Something went wrong ', e);
  }
};
