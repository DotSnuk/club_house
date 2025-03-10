const { validationResult } = require('express-validator');
const db = require('../db/queries');
const validator = require('./validatior');
const passport = require('passport');
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
  passport.authenticate('local'),
  (req, res, next) => {
    res.status(200).send({ success: true, user: req.user });
  },
];

const logout = (req, res, next) => {
  req.logout(err => {
    console.log('logging out');
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

const authStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.send({ isAuthenticated: true, user: req.user });
  }
  return res.send({ isAuthenticated: false });
};

module.exports = {
  createUser,
  loginUser,
  logout,
  authStatus,
};
