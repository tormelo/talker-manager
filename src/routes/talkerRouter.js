const express = require('express');
const validateId = require('../middlewares/validateId');
const validateTalkerData = require('../middlewares/validateTalkerData');
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
  const filteredTalkers = talkers.filter((t) => t.name.includes(q));
  res.status(200).json(filteredTalkers);
});

router.get('/talker/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkersData();
  const talker = talkers.find((t) => t.id === Number(id));
  res.status(200).json(talker);
});

router.get('/talker', async (req, res) => {
  const talkers = await readTalkersData();
  res.status(200).json(talkers);
});

router.use(validateToken);

router.delete('/talker/:id', validateId, async (req, res) => {
  const { id } = req.params;
  await deleteTalkerData(Number(id));
  res.status(204).send();
});

router.use(validateTalkerData);

router.post('/talker', async (req, res) => {
  const newTalker = await writeTalkersData(req.body);
  res.status(201).json(newTalker);
});

router.put('/talker/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const updatedTalker = await updateTalkerData(Number(id), req.body);
  res.status(200).json(updatedTalker);
});

module.exports = router;