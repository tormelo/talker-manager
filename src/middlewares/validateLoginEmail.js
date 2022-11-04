function validateLoginEmail(req, res, next) {
  const { email } = req.body;

  const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  const isEmailValid = emailRegex.test(email);

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    }); 
  }

  if (!isEmailValid) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    }); 
  }

  next();
}

module.exports = validateLoginEmail;