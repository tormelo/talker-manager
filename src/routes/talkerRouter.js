const express = require('express');
const { 
  validateTalkerName,
  validateTalkerAge,
  validateTalk, 
  validateTalkWatchedAt, 
  validateTalkRate,
  validateTalkerId, 
} = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');
const { 
  readTalkersData, 
  writeTalkersData, 
  updateTalkerData, 
  deleteTalkerData, 
} = require('../utils/fsUtils');

const router = express.Router();

router.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalkersData();
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
  res.status(200).json(filteredTalkers);
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

router.get('/talker', async (req, res) => {
  const talkers = await readTalkersData();
  res.status(200).json(talkers);
});

router.use(validateToken);

router.delete('/talker/:id', validateTalkerId, async (req, res) => {
  const { id } = req.params;
  await deleteTalkerData(Number(id));
  res.status(204).send();
});

router.use(validateTalkerName);
router.use(validateTalkerAge);
router.use(validateTalk);
router.use(validateTalkWatchedAt);
router.use(validateTalkRate);

router.post('/talker', async (req, res) => {
  const newTalker = await writeTalkersData(req.body);
  res.status(201).json(newTalker);
});

router.put('/talker/:id', validateTalkerId, async (req, res) => {
  const { id } = req.params;
  const updatedTalker = await updateTalkerData(Number(id), req.body);
  res.status(200).json(updatedTalker);
});

module.exports = router;