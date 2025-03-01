const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
const validator = require('./validatior');

const createUser = [
  validator.validateName,
  validator.validateEmail,
  validator.validatePassword,
  validator.validateConfirmPassword,
  (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      console.log(result.validationResult);
      return res.send({ success: false, errors: [...result.errors] });
    }
    next();
  },
  async (req, res) => {
    // add to db
    const { firstname, lastname, email, password } = req.body;
    const data = { firstname, lastname, email, password };
    // const result = await db.createUser(data);
    console.log('here');
  },
];

module.exports = {
  createUser,
};
