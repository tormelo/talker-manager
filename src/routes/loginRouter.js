const express = require('express');
const cryptoJS = require('crypto-js');
const validateCredentials = require('../middlewares/validateCredentials');

const router = express.Router();

router.post('/login', validateCredentials, async (req, res) => {
  const token = cryptoJS.lib.WordArray.random(8).toString();
  res.status(200).json({ token });
});

module.exports = router;