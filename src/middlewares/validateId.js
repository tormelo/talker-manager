const { readTalkersData } = require('../utils/fsUtils');

async function validateId(req, res, next) {
  const { id } = req.params;
  const talkers = await readTalkersData();
  const isValidTalker = talkers.some((talker) => talker.id === Number(id));

  if (!isValidTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  next();
}

module.exports = validateId;