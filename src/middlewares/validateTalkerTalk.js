function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  next();
}

function validateTalkWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const isDateValid = dateRegex.test(watchedAt);

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!isDateValid) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    }); 
  }

  next();
}

function validateTalkRate(req, res, next) {
  const { talk: { rate } } = req.body;
  
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  
  const rateRegex = /^\d{1}$/;
  const isValidFormat = rateRegex.test(rate);
  const isValidRange = Number(rate) >= 1 && Number(rate) <= 5;
  const isRateValid = isValidFormat && isValidRange;

  if (!isRateValid) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    }); 
  }

  next();
}

module.exports = { 
  validateTalk, 
  validateTalkRate, 
  validateTalkWatchedAt,
};