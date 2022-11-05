const { readTalkersData } = require('../utils/fsUtils');

async function validateId(req, res, next) {
  const { id } = req.params;
  const talkers = await readTalkersData();
  const isTalkerValid = talkers.some((t) => t.id === Number(id));

  if (!isTalkerValid) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  next();
}

module.exports = validateId;