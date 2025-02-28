const { body, validationResult } = require('express-validator');

const notEmpty = `can't be empty`;
const alphaError = 'must only contain letters';
const emailError = 'must be valid email adress';

const validateName = [
  body('firstname')
    .trim()
    .notEmpty()
    .withMessage(notEmpty)
    .isAlpha()
    .withMessage(alphaError),
  body('lastname')
    .trim()
    .notEmpty()
    .withMessage(notEmpty)
    .isAlpha()
    .withMessage(alphaError),
];

const validateEmail = body('email')
  .trim()
  .notEmpty()
  .withMessage(notEmpty)
  .isEmail()
  .withMessage(emailError);

const createUser = [
  validateName,
  validateEmail,
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.send({ success: false, errors: [...result.errors] });
    return res.send({ success: true, errors: [] });
  },
];

module.exports = {
  createUser,
};
