function validateTalkerName(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    }); 
  }

  next();
}

function validateTalkerAge(req, res, next) {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' }); 

  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    }); 
  }

  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  next();
}

function validateTalkWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const isDateValid = dateRegex.test(watchedAt);
  
  if (!isDateValid) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    }); 
  }

  next();
}

function validateTalkRate(req, res, next) {
  const { talk: { rate } } = req.body;
  
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  
  const rateRegex = /^\d{1}$/;
  const isFormatValid = rateRegex.test(rate);
  const isRangeValid = rate >= 1 && rate <= 5;
  const isRateValid = isFormatValid && isRangeValid;

  if (!isRateValid) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    }); 
  }

  next();
}

const validateTalkerData = [
  validateTalkerName, 
  validateTalkerAge, 
  validateTalk,
  validateTalkWatchedAt, 
  validateTalkRate,
];

module.exports = validateTalkerData;