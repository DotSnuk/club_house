const { validationResult } = require('express-validator');
const db = require('../db/queries');
const validator = require('./validatior');
const passwordUtil = require('../utils/password');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  console.log('serial');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('deserial');
    const rows = await db.getUserByID(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

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

const loginUser = passport.authenticate('local', {
  successRedirect: '/success',
  successMessage: 'success',
  failureRedirect: '/failed',
  failureMessage: 'failed',
});

const successLogin = (req, res) => {
  return res.send({ success: true });
};

const failedLogin = (req, res) => {
  return res.send({ success: false, msg: 'failed login' });
};

// const loginUser = [
//   async (req, res, next) => {
//     const { email, password } = req.body;
//     const response = await passwordUtil.comparePassword(email, password);
//     console.log(response);
//     return res.send(response);
//   },
// ];

module.exports = {
  createUser,
  loginUser,
  successLogin,
  failedLogin,
};
