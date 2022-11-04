const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { readTalkersData } = require('../utils/fsUtils');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const talkers = await readTalkersData();
  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkersData();
  const talker = talkers.find((t) => Number(id) === t.id);
  
  if (talker) return res.status(200).json(talker);
  
  res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

router.post('/talker', validateToken, (req, res) => {
  console.log(req.get('authorization'));
  res.status(200).send();
});

module.exports = router;