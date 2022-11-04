const express = require('express');
const cryptoJS = require('crypto-js');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = cryptoJS.lib.WordArray.random(8).toString();
  console.log(email, password);
  console.log(token);
  res.status(200).json({ token });
});

module.exports = router;