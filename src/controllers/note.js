const db = require('../database');

exports.get = async (_, res) => {
  try {
    const note = await db.all('SELECT * from note');
    return res.status(200).json(note);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await db.get('SELECT * from note where id = $id', { $id: id });

    if (!note) return res.status(400).send('Bad request');

    return res.status(200).json(note);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.post = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) return res.status(400).send('Bad request');

    const id = await db.run(`INSERT INTO note (title,content) VALUES ($title, $content)`, {
      $title: title,
      $content: content,
    });

    return res.status(200).json({ id, title, content });
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
};

exports.put = async (req, res) => {
  try {
    const {
      params: { id },
      body: { id: noteId, title, content },
    } = req;

    if (!title || `${id}` !== `${noteId}`) return res.status(400).send('Bad request');

    await db.run(`UPDATE note SET title = $title, content = $content WHERE id = $id`, {
      $id: id,
      $title: title,
      $content: content,
    });

    return res.status(200).json({ id: +id, title, content });
  } catch (e) {
    return res.status(500).send('Something went wrong ', e);
  }
};

exports.delete = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    if (!id) return res.status(400).send('Bad request');

    await db.run(`DELETE FROM note WHERE id = $id`, {
      $id: id,
    });

    return res.status(200).send('OK');
  } catch (e) {
    return res.status(500).send('Something went wrong ', e);
  }
};
