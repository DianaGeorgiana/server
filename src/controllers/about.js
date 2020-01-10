const config = require('../config');

exports.get = (_, res) => {
  const { DESCRIPTION, VERSION } = config;
  res.status(200).send(`${DESCRIPTION} ${VERSION}`);
};
