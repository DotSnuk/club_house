const { validationResult } = require('express-validator');
const db = require('../db/queries');
const validator = require('./validatior');
const passwordUtil = require('../utils/password');

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
    const passhashAndSalt = await passwordUtil.genPassword(password);
    console.log(passhashAndSalt);
    const data = {
      firstname,
      lastname,
      email,
      passwordhash: passhashAndSalt.passwordhash,
      salt: passhashAndSalt.salt,
    };
    await db.createUser(data);
    res.send({ success: true });
  },
];

const loginUser = [
  async (req, res, next) => {
    const { email, password } = req.body;
    const response = await passwordUtil.comparePassword(email, password);
    console.log(response);
    return res.send(response);
  },
];

module.exports = {
  createUser,
  loginUser,
};
