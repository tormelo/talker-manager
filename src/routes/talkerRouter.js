const express = require('express');
const { readTalkersData } = require('../utils/fsUtils');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const talkers = await readTalkersData();
  res.status(200).json(talkers);
});

module.exports = router;