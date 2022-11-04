const express = require('express');

const router = express.Router();

router.post('/login', async (req, res) => {
  res.status(200).send();
});

module.exports = router;